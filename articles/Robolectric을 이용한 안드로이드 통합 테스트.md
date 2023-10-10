# Robolectric을 이용한 안드로이드 통합 테스트

## Robolectric
Robolectric은 JVM 위에서 안드로이드 의존성을 가지고 테스트 할 수 있도록 해주는 라이브러리이다.
보통은 Unit Test에 안드로이드 의존을 추가하기 위해서 사용한다.

## Robolectric을 이용한 통합 테스트?
그렇다면 View, ViewModel, Domain, DataBinding 으로 구성되는 안드로이드 권장 아키텍쳐의 흐름을 테스트 할 수 있지 않을까 라는 의문이 든다.
이에 본인의 경험을 공유한다.

본 포스팅은 아래의 테스트 함수를 기준으로 서술한다. [전체 코드](https://github.com/DYGames/android-paint/tree/step3)

```kotlin
@RunWith(RobolectricTestRunner::class)
class MainActivityTest {
    @get:Rule
    val activityScenarioRule = ActivityScenarioRule(MainActivity::class.java)
    
    @Test
    fun `선을 선택하고 굵기를 30으로 조정하고 PaintView를 드래그하면 PaintViewModel의 lines LiveData에 굵기가 30인 Line이 추가된다`() {
        activityScenarioRule.scenario.onActivity { activity ->
            // given
            val paintViewModel = ViewModelProvider(activity)[PaintViewModel::class.java]
            val paintView = activity.findViewById<PaintView>(R.id.main_paint_view)
            activity.findViewById<Button>(R.id.main_line_pen_btn).callOnClick()
            println("Button Pressed")
            activity.findViewById<Slider>(R.id.main_width_slider).value = 30F
            activity.executePendingDataBinding<ActivityMainBinding>()

            // when
            drag(paintView)

            // then
            val expected = 30F
            val actual = paintViewModel.lines.getOrAwaitValue().value[0].paint.strokeWidth
            println("strokeWidth : $actual")
            assertEquals(expected, actual)
        }
    }
}
```

## Activity 환경 구성
먼저 Activity 환경을 구성한다.
```kotlin
@RunWith(RobolectricTestRunner::class)
class MainActivityTest {
    @get:Rule
    val activityScenarioRule = ActivityScenarioRule(MainActivity::class.java)
    @Test
    fun ActivityTest() {
        activityScenarioRule.scenario.onActivity { activity ->
```

위와 같이 Activity 생명주기를 관리하는 `ActivityScenarioRule`을 추가하고 테스트 함수 내에서 `onActivity()` 통해 테스트 액티비티 환경을 구성 할 수 있다.

## 사용자 이벤트 발생
그렇다면 이제 뷰에 접근하여 사용자 이벤트를 발생 시킬 수 있다.

```kotlin
activity.findViewById<Button>(R.id.main_line_pen_btn).callOnClick()
```

`Button.callOnClick()` 함수를 통해 Button의 `OnClickListener.onClick()` 콜백을 실행 시킬 수 있다.

또한 `view.dispatchTouchEvent()` 같은 터치 이벤트 전달도 가능하다.

## ViewModel 함수 실행

내부에 여러 동작이 있을 수 있지만, ViewModel 함수를 실행하고 LiveData를 변경시키는 상황을 가정해 보겠다.

```kotlin
private val _pen: MutableLiveData<Pen> = MutableLiveData()
val pen: LiveData<Pen>
    get() = _pen

fun changeToEllipsePen() {
    _pen.value = EllipsePen(onAddInk = ::addInk)
}
```
위 ViewModel 함수는 _pen이라는 LiveData를 갱신하고 이는 pen이라는 LiveData에 전파된다.

## DataBinding 참조, 동기적 LiveData 갱신

이때 DataBinding에서 이 pen을 Observe하고 있다고 가정하자.

```xml
<woowacourse.paint.view.PaintView
    app:pen="@{paintViewModel.pen}" />
```
```kotlin
fun setPen(pen: Pen) {
    println("setPen Called")
    this.pen = pen
}
```

이때 우리는 테스트 함수 스코프 내에서 `PaintView.setPen()` 함수가 호출되기를 기대한다.

하지만 그렇지 않다. 

위의 코드의 `activity.executePendingDataBinding()`를 제거하고 실행하면 아래와 같은 로그가 출력된다.
```
setPen Called
Button Pressed
strokeWidth : 0.0
setPen Called
```

버튼이 눌러지고, 테스트 함수가 실행이 완료되고 나서 DataBinding의 함수가 실행되는 것이다.

이유는 알 수 없지만 (댓글 부탁), DataBinding의 Observe는 다음 프레임에 실행되는 듯 하다.

이를 해결하기 위해 우리는 `DataBinding.executePendingBindings()` 함수를 이용하여 Pending 상태의 Observe를 전부 수행 할 수 있다.

또한 Test 함수에서 Activity의 DataBinding의 참조를 가져올 순 없다. (일반적으로 private으로 설정한다고 가정한다.)

이때 우리는 `DataBindingUtil.getBinding()` 함수를 이용 할 수 있다.

따라서 아래와 같은 코드로 우리는 성공적으로 DataBinding에 대한 동기적 Observe를 수행가능하다.

```kotlin
fun <T : ViewDataBinding> Activity.executePendingDataBinding() {
    val rootView = (findViewById<ViewGroup>(android.R.id.content)).getChildAt(0) ?: return
    val dataBinding = DataBindingUtil.getBinding<T>(rootView) ?: return
    dataBinding.executePendingBindings()
}
```

다시 위로 돌아가 `activity.executePendingDataBinding()`를 포함한 테스트 코드를 실행하면 아래와 같이 의도한 바대로 코드가 동작하게 된다.

```
setPen Called
Button Pressed
setPen Called
strokeWidth : 30.0
```

## ViewModel 참조, 동기적 LiveData 값 참조
이렇게 사용자 이벤트와 DataBinding 동기화를 통해 성공적으로 ViewModel에 값을 전달할 수 있다.

그렇다면 우리는 검증을 위해 ViewModel의 값을 참조해야 한다. 하지만 일반적으로 ViewModel도 private으로 접근이 제한되어 있을 것이다.

이는 우리의 Activity가 `ViewModelStoreOwner`를 구현한다는 가정 하에 해결 가능하다.

우리는 일반적으로 `ViewModelProvider`를 통해 ViewModel 인스턴스를 관리한다.

그렇다는 것은 Robolectric으로 생성된 MainActivity의 참조를 이용해 `ViewModelStore`에 미리 테스트 코드에서 생성한 ViewModel을 등록 할 수 있다.

```kotlin
val paintViewModel = ViewModelProvider(activity)[PaintViewModel::class.java]
```

이렇게 생성된 ViewModel 인스턴스로 우리는 성공적으로 LiveData 값을 검증 가능하다.

```kotlin
val expected = 30F
val actual = paintViewModel.lines.getOrAwaitValue().value[0].paint.strokeWidth
assertEquals(expected, actual)
```

여기서 또한 `getOrAwaitValue()` 라는 확장 함수가 등장한다. 이를 사용한 이유는 우리 LiveData중 Transformation.map을 사용하는 코드가 있다.

이는 observe()가 걸려있지 않으면 value가 변경되어도 값을 전파하지 않는다. 이를 동기적으로 가져올 수 있도록 구글에서 제공하는 확장 함수를 통해 구현하였다.

## 결론

위와 같은 테스트 기법으로 우리는 `사용자 입력 -> ViewModel -> Domain -> ViewModel -> UI 갱신` 등의 모든 흐름을 실제 구현된 안드로이드 코드로 직접 테스트함으로써 우리의 코드가 진짜 동작하는지 진실된 검증이 가능하다.

테스트 코드에서 DataBinding, ViewModel의 참조를 들고 있는 것이 논란의 여지가 있겠지만 이를 팀원과 잘 조율하여 해소한다면 이 방식은 통합 테스트를 빠르고 가벼운 환경에서 제공 할 수 있을 것이라 판단한다.
