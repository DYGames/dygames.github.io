# kotlin의 scope function

kotlin의 scope function은 객체의 context를 포함한 하나의 목적을 가진 코드 블럭을 실행하는 함수이다.

let, with, run, apply, also 이렇게 5가지가 있으며 각각은 인자, 반환 타입, 사용 목적이 전부 다르다.

이를 사용하는데엔 어느정도 정해진 가이드가 있지만 팀의 컨벤션에 맞추는것이 좋다고 생각한다.

## let

**Context object** : `it`

**return type** : `람다식 결과`

- Call chain의 결과로 여러 함수를 호출하는데 사용된다.
- Non-null object에 람다식을 호출하는데도 사용된다.

## with

**Context object**: `this`

**return type**: `람다식 결과`

- 확장 함수가 아님
- 주로 반환값이 필요없는 코드 실행에 사용된다.

## run

**Context object**: `this`

**return type**: `람다식 결과`

- with과 비슷하지만 확장 함수로 구현되었다.
- 주로 객체를 초기화하고 반환값을 계산하는데 사용된다.
- 또한 context가 없이 실행될 수도 있다.

## apply

**Context object**: `this`

**return type**: `context object`

- 주로 객체를 설정하는데 사용한다.

## also

**Context object**: `it`

**return type**: `context object`

- 객체를 이용해 행동을 하고자 할 때 사용한다.
- 객체 자체에 대한 참조가 필요하거나 외부 스코프의 this를 shadow 하고싶지 않을 때 사용한다.

---

### with과 run의 차이

얼핏 보면 `with`과 `run`의 context object와 return type이 같아 사용 목적이 헷갈릴 수 있다.

- with은 non-null 객체를 이용하고, 반환값이 필요하지 않을 때 사용한다.
- run은 non-null 검사를 할 수 있고, 실행문의 결과를 반환할 때 사용한다.

### this 참조 문제점

- 외부 스코프의 this가 참조하는 변수와 같은 이름을 가진 변수가 있으면 모호한 참조로 가독성이 떨어질 수 있다.