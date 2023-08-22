# Kotlin Closure

## Scope

- 스코프란?
    - 코드의 블럭
    - 외부의 변수는 참조 가능하지만 외부에서 스코프 내부의 변수는 참조 불가능

```kotlin
fun foo() {
    var count = 0
    run {
        val scopedCount = count++
    }
}
```

## Function

### Function Types

함수의 매개 변수와 반환 타입을 정의한다.

```kotlin
(Int, String) -> Char
() -> Unit
```

위 코드에서 `(Int, String)`은 함수가 받게될 인자의 타입을 정의하고, `Char`는 반환 값의 타입을 정의했다.

`()`는 함수가 빈 매개변수를 갖는다는 것이고 `Unit`은 반환 값의 타입이 비어있다는 것을 의미한다.

### First Class Functions

Kotlin 함수는 일급 시민으로 취급한다. 일급 시민의 특징은 :

- 인자로 전달 가능
- 함수에서 반환 가능
- 변수에 할당 가능
- 자료 구조에 저장 가능

이러한 함수를 인자로 받거나 반환하는 함수를 고차 함수라고 한다.

## Lambda

- 람다 표현과 익명 함수는 함수 리터럴이다. 함수 리터럴은 선언되지 않았지만 표현식으로 바로 전달되는 함수이다.
- 람다식 문법

```kotlin
val sum: (Int, Int) -> Int = { 
    x: Int, y: Int -> x + y 
}
```

- 컴파일러 타입 추론에 의해서 람다에서 타입을 추론해 변수의 타입을 명시해 주지 않아도 된다.

```kotlin
val sum = { 
        x: Int, y: Int -> x + y 
}
```

## Closures

**함수와 그 함수가 참조하는 외부 스코프의 지역 변수를 의미한다.**

- 람다, 익명 함수, 지역 함수, 익명 클래스에서 Closure가 생성
- Closure가 ‘포획’한 변수는 스코프 내부에서 변경 가능

```kotlin
var sum = 0
ints.filter { it > 0 }.forEach {
    sum += it
}
print(sum)
```

### 변수 포획

```kotlin
var index = 0
while (index < buttons.size) {
    buttons[index].setOnClickListener {
        println(index)
    }
    index++
}
```

위 코드에서 버튼을 클릭 할 때 어떤 일이 발생할까?

콘솔에 각 버튼의 index에 해당하는 값이 출력된다고 생각하기 쉽지만, 사실 button.size에 해당하는 값이 출력된다. 변수를 포획 할 때 가변 값을 포획하면 변수의 값을 포획하는 것이 아닌 그 참조를 포획하기 때문에 버튼을 클릭하는 시점에서는 index가 이미 button.size만큼 더해졌고, 그 값을 출력하는 것이다.

### 자바에서 변수 포획

자바에서는 포획한 변수는 final 이다.

자바에서 람다에서 외부 스코프의 변수를 참조할 수 있도록 자바는 외부 스코프와 동일한 변수 영역 (Lexical Scope)을 갖는다. 이를 변수 포획이라고 한다. 그래서 이 람다 안에서 this는 람다로 생성되는 객체가 아닌 외부 스코프의 객체를 가르킨다. 이때 람다에서 값을 변경하면 외부 스코프에서도 값이 변경될 것이고, 이는 멀티 스레드 환경에서 위험할 뿐더러 함수형 프로그래밍의 개념을 벗어나는 일이 될 것이다.

이를 해결하기 위해서 속임수를 사용해서 이렇게 포획한 변수를 변경 가능하게 할 수 있다.

먼저 값을 포장하는 클래스를 만들어 이 클래스의 참조를 포획하는 것이다.

```java
final AtomicInteger sum = new AtomicInteger();
new Thread(() -> {
    sum.addAndGet(1);
}).start();
```

또 크기가 1인 배열을 만들어서 그 배열의 참조를 포획하는 방법이 있다.

```java
final int[] sum = {0};
new Thread(() -> {
    System.out.println(sum[0]);
    sum[0] += 1;
}).start();
```

### 코틀린에서 변수 포획

코틀린에서는 컴파일러가 자동으로 포획한 변수를 참조, 변경 가능하게 자바 코드를 생성해 준다.

```kotlin
var sum = 0
Thread {
    sum += 1
}.start()
```

```java
final Ref.IntRef sum = new Ref.IntRef();
sum.element = 0;
(new Thread((Runnable)(new Runnable() {
   public final void run() {
      ++sum.element;
   }
}))).start();
```

### 레퍼런스

[https://blog.fupfin.com/?p=50](https://blog.fupfin.com/?p=50)