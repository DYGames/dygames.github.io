# MockK을 이용한 Presenter 테스트

## Presenter

MVP 패턴에서 Presenter는 View와 Model에 대한 의존을 가지고 서로 연결을 수행한다. 이때 Presenter를 테스트 하려면 어떡해야 할까?

Android에서 View는 Activity, Model은 Database, HTTP등 각 레이어는 외부 종속을 가질 가능성이 높다. 테스트를 위해 이에 대한 인스턴스를 직접 생성하고 실제 동작을 테스트하기에는 어려움이 있다. 이때 [테스트 더블](https://tecoble.techcourse.co.kr/post/2020-09-19-what-is-test-double/)을 사용하여 이들에 대한 가짜 객체를 생성하고 이 가짜 객체들이 기대값을 반환하도록 설정하여 테스트를 구현할 수 있다. View와 Model의 가짜 객체를 생성하기 위해 Mock 기법을 사용할 수 있는데, Kotlin에서 Mock 객체를 생성하는데 [MockK](https://mockk.io/) 라이브러리를 사용 할 수 있다.

---

## MockK

### 의존성 추가

```kotlin
testImplementation "io.mockk:mockk-android:${mockkVersion}"
testImplementation "io.mockk:mockk-agent:${mockkVersion}"
```

다음과 같은 의존성을 gradle에 추가해줘서 사용할 수 있다.

### mockk()

mockk 객체를 생성한다.

- 일반 클래스는 final 여부와 상관없이 클래스의 인스턴스 생성
- 추상 클래스나 인터페이스의 경우 Subclass가 생성되고 그 인스턴스 생성
- ByteBuddy를 사용하여 메서드의 호출 결과를 변경

### mockk(relaxed = true)

relaxed mock 객체를 생성한다. 이는 모든 함수에 대해 간단한 값을 반환하도록 설정하고, 내부의 동작에 대해 Answer를 설정하지 않아도 되게 해준다.

---

## Answers : every {}

생성된 mockk 객체의 메소드에 대한 호출 결과를 설정

### Matchers

```kotlin
every { productRepository.findById(3) } returns Product(3)

every { productRepository.findById(any()) } returns Product(0)

every { productRepository.findById(range(1,3)) } returns Product(0)
```

mockk 객체의 메소드에 matcher를 이용해 파라미터별로 호출 결과를 설정 할 수 있다.

### capture()

mockk 객체의 메소드에 넘겨지는 인자값을 capture하고 저장 할 수 있다.

```kotlin
val slot = slot<Int>()
every { productRepository.findById(capture(slot)) } returns Product(0)
```

### just runs

- 메소드가 Unit을 반환함을 설정
- justRuns를 사용할 수 있다.

```kotlin
every { productRepository.save(Product()) } just runs

justRuns { productRepository.save(Product)) }
```

### returns `value`

- 메소드가 Value를 반환함을 설정

```kotlin
every { proudctRepository.findAll() } returns Products()
```

### returnsMany `list`

- 메소드가 호출 될 때매다 list의 원소를 순차적을 반환한다.
- andThen을 사용할 수 있다.

```kotlin
val products = listOf(Product(3), Product(1), Product(2))
every { productRepository.findRandomProduct() } returnsMany products

every { productRepository.findRandomProduct() } returns Product(3) andThen Product(1) andThen Product(2)
```

### throws

- 예외를 던진다.

```kotlin
every { productRepository.requestWrongProduct() } throws IllegalStateException()
```

### answers

- 코드 블럭의 실행 결과를 반환하도록 한다.

```kotlin
every { productRepository.findAll() } answers { products.findByRange(1, 3) }
```

---

## Validators : verify { }

- mockk 객체의 함수가 호출되었는지 검증한다.

```kotlin
verify { productRepository.findAll() }
```

- atLeast
    - 최소 n번 호출되었는지 검증
- atMost
    - 최대 n번 호출되었는지 검증
- exactly
    - 정확히 n번 호출되었는지 검증

```kotlin
verify(atLeast=3) { productRepository.findById(1) }
verify(atMost=3) { productRepository.findById(1) }
verify(exactly=3) { productRepository.findById(1) }
```

- verifyAll
    - 모든 함수가 호출되었는지 검증
- verifyOrder
    - 함수가 순서대로 호출되었는지 검증
- verifySequence
    - 모든 함수가 정확히 순서대로 호출되었는지 검증

---

## Presenter Test 전략

```kotlin
// ProductDetailPresenter.kt
override fun addToCart(cartProduct: CartProductModel) {
    cartRepository.addCartProduct(cartProduct.toDomainModel())
    view.close()
}
```

```kotlin
// ProductDetailPresenterTest.kt
@Test
fun 카트에_상품을_담으면_카트에_상품을_추가하고_뷰를_종료한다() {
    // given
    val view: ProductDetailContract.View = mockk()
    val cartRepository: CartRepository = mockk()
    val cartProduct = CartProductModel(0, ProductModel())

    val presenter = ProductDetailPresenter(
        view = view,
        product = mockk(),
        recentProduct = mockk(),
        recentProductRepository = mockk(),
        productRepository = mockk(relaxed = true),
        cartRepository = cartRepository
    )
    every { cartRepository.addCartProduct(any()) } just runs
    every { view.close() } just runs

    // when
    presenter.addToCart(cartProduct)

    // then
    val expect = CartProduct(0, ProductModel().toDomainModel())
    verify { cartRepository.addCartProduct(expect) }
    verify { view.close() }
}
```

GWT (Given-When-Then) 패턴을 따르는 Presenter 테스트 코드의 예시이다. 장바구니에 CartProduct를 Add하는 과정을 테스트 하고 있다.

### Given

```kotlin
val view: ProductDetailContract.View = mockk()
val cartRepository: CartRepository = mockk()
val cartProduct = CartProductModel(0, ProductModel())
```

mocking이 필요한 객체와 그렇지 않은 객체를 구별하여 인스턴스를 생성한다.

```kotlin
val presenter = ProductDetailPresenter(
    view = view,
    product = mockk(),
    recentProduct = mockk(),
    recentProductRepository = mockk(),
    productRepository = mockk(relaxed = true),
    cartRepository = cartRepository
)
```

테스트 코드에서 참조하지 않고, 검증하지 않을 인스턴스는 mockk() 객체를 바로 넘겨준다. 이때 테스트 코드에서 검증할 필요가 없는 로직을 호출하는 객체들은 Relaxed로 생성한다.

```kotlin
every { cartRepository.addCartProduct(any()) } just runs
every { view.close() } just runs
```

테스트 할 Presenter 메소드 내부에서 호출하는 메소드들에 Answer를 지정해준다.

### When

```kotlin
presenter.addToCart(cartProduct)
```

Presenter 메소드를 호출한다.

### Then

```kotlin
// then
val expect = CartProduct(0, ProductModel().toDomainModel())
verify { cartRepository.addCartProduct(expect) }
verify { view.close() }
```

Presenter에서 개발자가 의도한 함수가 실행되고 정확한 값이 로직의 흐름에 존재하는지 함께 확인한다. 이는 verify에서 함수의 인자에 expect된 값을 넣어 확인할 수 있다.