# CompletableFuture를 이용한 비동기 처리 전략

## CompletableFuture란?

자바 1.5에서 비동기 처리를 위해 추가된 [Future](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Future.html)에는 다음과 같은 한계가 있다.

- get() 함수를 이용한 블로킹이 강제된다.
- 여러 Future간에 조합이 지원되지 않는다.
- 예외 처리를 지원하지 않는다.

이를 해결하기 위해 1.8에서 [CompletableFuture](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html)가 등장하였다.

### 주요 함수

supplyAsync

- 자바의 ForkJoinPool.commonPool()에서 꺼내온 스레드에서 작업을 실행하는 CompletableFuture를 반환하는 정적 함수이다.

```kotlin
fun findById(id: Long): CompletableFuture<Result<Foo>> {
    return CompletableFuture.supplyAsync {
        dataSource.findById(id).mapCatching { foos ->
            foos.toDomain()
        }
    }
}
```

thenApply

- 이전 작업의 결과를 받아 동기 작업을 실행하고 그 결과가 담긴 CompletableFuture를 반환한다.

thenCompose

- 이전 작업의 결과를 받아 Future 작업을 실행하고 그 결과가 담긴 CompletableFuture를 반환한다.

thenAccept

- 이전 작업의 결과를 받아 비동기 작업을 실행하고 상태가 CompletionStage이고 값이 Void인 CompletableFuture를 반환한다.

exceptionally

- future method chaining 과정에서 발생하는 모든 예외를 이곳에서 처리한다.

```kotlin
fun loadFoo(productId: Long, count: Int) {
    fooRepository.findById(productId).thenCompose {
        val foo = it.getOrThrow()
        barRepository.updateCountById(foo.id, count)
    }.thenAccept {
        it.getOrThrow()
        view.showFooView()
    }.exceptionally {
        it.handle(view)
        null
    }
}
```

get()

- 블로킹하여 작업을 실행하고 결과를 반환한다.

## Retrofit에서 동기, 비동기

### enqueue - 비동기

- Http 요청을 실행하고 Retrofit2.Callback 인터페이스를 구현하는 콜백을 실행하며 응답을 반환한다.

```kotlin
override fun findDiscountPolicy(price: Int, memberGrade: String) {
    orderService.selectDiscountPolicy(price, memberGrade).enqueue(
        object : Callback<DiscountsEntity> {
            override fun onResponse(
                call: Call<DiscountsEntity>,
                response: Response<DiscountsEntity>
            ) {
                if (response.code() != 200) throw DataError.OrderFindError(response.message())
                response.body() ?: throw DataError.OrderFindError(response.message())
                // do something with body
            }
            override fun onFailure(call: Call<DiscountsEntity>, t: Throwable) {
                // do something with error
            }
        }
    )
}
```

### execute - 동기

- Http 요청을 실행하고 그 Thread를 block 한 후 그 값을 반환한다.

```kotlin
override fun findDiscountPolicy(price: Int, memberGrade: String): Result<DiscountsEntity> {
    return runCatching {
        val response = orderService.selectDiscountPolicy(price, memberGrade).execute()
        if (response.code() != 200) throw DataError.OrderFindError(response.message())
        response.body() ?: throw DataError.OrderFindError(response.message())
    }
}
```

이 둘을 결정하는 유일한 요소는 비동기를 어떤 계층에서 처리해줄 것이냐이다.

## MVP, Repository 패턴에서 사용 전략

### Presenter

생성된 CompletableFuture를 이용해 Presenter Layer에서 Method Chaining으로 논리를 전개한다.

```kotlin
override fun addProductToCart(productId: Long, count: Int) {
    productRepository.findById(productId).thenCompose {
        val product = it.getOrThrow()
        val cartItem = CartItem(-1, count, product)
        val savedCartItem = cartItemRepository.save(cartItem, currentUser).get().getOrThrow()
        cartItemRepository.updateCountById(savedCartItem.id, count, currentUser)
    }.thenAccept {
        it.getOrThrow()
        view.showCartView()
    }.exceptionally {
        it.handle(view)
        null
    }
}
```

### Repository

Repository단에서 supplyAsync 함수를 이용해 비동기 처리를 수행한다.

```kotlin
override fun findById(id: Long): CompletableFuture<Result<Product>> {
    return CompletableFuture.supplyAsync {
        dataSource.findById(id).mapCatching { products ->
            products.toDomain()
        }
    }
}
```

### DataSource

Result 객체를 반환하여 성공과 실패에 대해 처리할 수 있도록 한다. DataSource는 동기, 비동기가 관심사가 아니다.

```kotlin
override fun findById(id: Long): Result<ProductEntity> {
    return runCatching {
        val response = productService.selectProduct(id).execute()
        if (response.code() != 200) throw DataError.ProductFindError(response.message())
        response.body() ?: throw DataError.ProductFindError(response.message())
    }
}
```

### Presenter Test

동기적인 작업을 수행하는 것과 동일하게 비동기 작업의 결과를 stubbing하고 테스트한다.

이때 CompletableFuture.completedFuture()를 이용한다. 이는 이미 완료된 상태의 CompletableFuture를 반환한다.

```kotlin
@Test
fun addProductToCart() {
    // given
    val product = Product()
    val savedCartItem = CartItem()
    every { productRepository.findById(any()) } returns async(product)
    every { cartItemRepository.save(any()) } returns async(savedCartItem)
    every { cartItemRepository.updateCountById(any(), any()) } returns async(Unit)
    
    // when
    presenter.addProductToCart(0, 1)
    
    // then
    verify { view.showCartView() }
}
```

```kotlin
fun <T> async(value: T): CompletableFuture<Result<T>> =
    CompletableFuture.completedFuture(Result.success(value))
```

### 장점

비동기 작업에 대한 테스트가 편리하다.

- 동기 작업과 거의 동일한 문법으로 작성 가능하다.

각 계층간에 관심사 분리가 뚜렷하다.

- 비동기 작업을 실행해줄 계층에서만 처리하고 나머지 계층은 동일한 구현이 가능하다.

코드의 가독성이 현저히 증가한다.

- method chaining으로 순차적인 비동기 작업을 실행하므로 콜백 지옥이 일어나지 않는다.