# Kotlin Functional Interface (SAM)

코틀린에는 하나의 추상 메소드만 존재하는 인터페이스인 Funcional Interface가 존재한다. 이는 SAM (Single Abstract Method) Interface라고 불리기도 한다. interface 앞에 fun이라는 키워드를 붙여서 선언할 수 있다.

```kotlin
fun interface KRunnable {
   fun invoke()
}
```

이를 어떻게 활용할 수 있을까?

### SAM Conversion

위 인터페이스를 사용하는 방법을 생각해보자. 코틀린의 익명 객체를 활용하여 아래와 같이 작성할 수 있을 것이다.

```kotlin
val task = object : KRunnable {
	override fun invoke() {
		doSomething()
	}
}

task.invoke()
```

여기서 코틀린의 SAM Conversion 기능을 사용하면 아래와 같이 축약하여 쓸 수 있다.

```kotlin
val task = KRunnable {
	doSomething()
}

task.invoke()
```

또한 이 기능은 자바에서 하나의 함수를 가지는 인터페이스에 대해 자동 변환을 지원해준다.

```kotlin
// Java
public interface OnClickListener {
	void onClick(View v);
}

// Kotlin
button.setOnClickListener {

}
```

### 고차 함수

코틀린에서 함수는 일급 시민이다. 이는 변수에 저장될 수 있고 인자로 전달되거나 결과로 반환될 수 있다는 의미이다.

이렇게 함수를 인자로 전달받거나 결과로 반환할수 있는 함수를 **고차 함수**라고 한다. 이와 SAM을 같이 활용하면 아래와 같은 함수를 작성할 수 있다.

```kotlin
fun setMyOnClickListener(onClick: OnClickListener)

setMyOnClickListener {
	doSomething()
}
```

### SAM vs Type Aliases

위의 SAM을 이용하지 않고 Type Aliases를 이용해 함수를 인자로 넘기는 기능을 생각해보자.

```kotlin
fun setMyOnClickListener(onClick: (View) -> Unit)
```

문법적, 성능적으로 간결하게 함수를 전달할 수 있다.

```kotlin
// Java
public interface KRunnable {
	public void invoke();
}

// Kotlin
interface KRunnable {
   fun invoke()
}
```

코틀린은 위 자바 인터페이스는 SAM Conversion하지만 아래 인터페이스는 그렇지 않다.

SAM은 기본적으로 자바와의 호환성을 위해 개발된 기능이다. 그래서 SAM Conversion이라는 과정이 필요하고, interface 선언이 필요하므로 Type Aliases에 비해 복잡해진다. 이 둘을 각각 어떤 상황에서 사용할 수 있을까?

- 함수가 명확한 인자와 반환 타입을 전달한다면 Type Aliases를 사용한다.
- 함수가 Type Aliases로 표현하기 어려운 복잡한 함수를 전달한다면 SAM을 사용한다.