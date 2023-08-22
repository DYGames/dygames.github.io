# JVM Type Erasure On Kotlin, Variance

아래 코드를 살펴보자.

```kotlin
fun bar(foo: List<String>): String {
    return ""
}

fun bar(foo: List<Int>): String {
    return "2";
}
```

이 코드가 코틀린 컴파일러에 의해 컴파일 될까? 정답은 `그렇지 않다`이다.

```
Foo.kt:10:5 Platform declaration clash: The following declarations have the same JVM signature (bar(Ljava/util/List;)Ljava/lang/String;):
    fun bar(foo: List<Int>): String defined in Foo
    fun bar(foo: List<String>): String defined in Foo
```

위의 에러 메시지가 발생하는데, **method overloading**에 의해 함수 이름은 같고 인자는 다른 bar() 함수가 정의될 것 같지만 그렇지 않다. JVM의 `Type Erasure` 특성에 의하여 런타임에 인자의 타입 정보는 소거되어 두 함수의 JVM 시그니쳐는 동일해지고 컴파일에 실패하게 된다. 

이를 이해하기 위해선 먼저 Generic Variance에 대해 이해하여야 한다.

## Variance (변성)

**타입의 계층 관계(Type Hierarchy)에서 서로 다른 타입 간에 어떤 관계가 있는지**를 나타내는 개념이다.

List<String> 이라는 타입이 있을 때, List는 Base Type이고 String 은 Type Argument이다.

제네릭에서 변성은 Base Type이 같을 때 Type Argument간의 관계를 나타내는 것이다.

### 기본적으로 제네릭은 **불공변(invariant)**이다.

> 타입 C가 B의 하위 타입이지만, List<C>은 List<B>의 하위 타입이 아니라는 의미이다.
> 

**따라서 아래 개념들을 이용해 런타임에서 제네릭 타입의 Type Argument를 어떻게 처리할지 지정할 수 있다.**

### **공변(covariant)**는 Type Argument가 상속 관계일 때, 제네릭 타입도 상속 관계라는 것을 의미한다.

코틀린에서는 아래와 같은 표현으로 선언할 수 있다.

```kotlin
A : B : C
fun covariant(type: List<out B>)

covariant(A::class) //compile error
covariant(B::class)
covariant(C::class)
```

### **반공변(contravariant)**은 Type Argument가 상속 관계일 때, 제네릭 타입은 역전된 상속 관계라는 것을 의미한다.

```kotlin
A : B : C
fun contravariant(type: List<in B>)

covariant(A::class)
covariant(B::class)
covariant(C::class) //compile error
```

## Type Erasure

코틀린에서 제네릭 선언에 대한 타입 안전 검사는 컴파일타임에 완료되고, 런타임에는 제네릭 인스턴스에 대한 Type Argument 정보는 소거된다.

> List<Object>, List<String> ⇒ List<*>
> 

이에 의해, 런타임에 제네릭 타입의 Type Argument가 어떤 타입인지 알 방법이 없으므로 다음과 같은 코드는 금지된다.

```kotlin
ints is List<Int>
list is T
```

star-projected type을 이용한 검사는 가능하다.

```kotlin
something is List<*>
```

### Unchecked Cast

```kotlin
Sequence<View> as Sequence<SeatView>
```

고수준 로직에서 type safety가 보장되지만 컴파일러에 의해선 추론되지 않는 type cast에 대해 warning을 발생시키고 cast를 허용하는 것이다.

이때 발생하는 warning에 대해 코틀린에서 제공하는 해결 방법이 있다. `inline`, `reified` 키워드를 함께 사용하는 것이다.

```kotlin
inline fun <reified T> check(type: T) {
	
}
```

이를 이용해 런타임에 T의 타입 정보를 얻을 수 있게 된다.

### [Type Erasure가 이루어지는 이유?](https://stackoverflow.com/questions/20918650/what-are-the-benefits-of-javas-types-erasure)

```kotlin
fun <T> broke(): T = T()
```

(물론 컴파일 되지 않겠지만) T의 생성자가 인자를 요구한다면 위의 프로그램의 동작이 어떻게 될지는 정해지지 않았다.