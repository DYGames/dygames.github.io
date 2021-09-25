---
title: IL2CPP로 빌드시 GetConstructor()에서 null을 리턴 할 경우
date: 2021-09-25 18:09:55
category: Unity
thumbnail: { thumbnailSrc }
draft: false
---

기존에 Mono로 빌드된 프로젝트를 IL2CPP로 다시 빌드하는 작업을 하던 중, 안드로이드 빌드에서 기존엔 잘 작동하던 Reflection 관련 코드가 동작을 안하는 오류를 발견했다.

로그를 찍어가며 원인을 찾아보니, 아래 코드에서 \`GetConstructor()\` 함수에서 null을 리턴하여서 오류가 발생했던 것이었다.

```
var t = type.GetConstructor(Type.EmptyTypes).Invoke(null);
```

[GetConstructor()](https://docs.microsoft.com/ko-kr/dotnet/api/system.type.getconstructor) 함수는 현재 Type의 생성자를 가져오는 함수이다.

그런데 어떻게 생성자를 가져오는데 null이 리턴될 수 있을까?

IL2CPP에서 빌드를 할때는 [Managed code stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html)이라는 기법을 사용하는데, 빌드에서 사용하지 않는 코드를 삭제하여 빌드 크기를 줄이는 기법이다.
여기서 사용되지 않는 코드는 레벨에 따라 결정되는데, IL2CPP에서 기본은 Low로 설정되어있다.

여기서 문제는 내가 \`GetConstructor()\` 함수를 이용해 생성자를 가져오려고 한 클래스가 code stripping에 의해 제거되었다는 것이다.

![StrippingLevel](https://docs.unity3d.com/kr/current/uploads/Main/mgc_StripLevel.png)

이를 방지하기 위해 Stripping Level을 Disabled로 설정 할 수도 있지만 이는 빌드의 크기가 지나치게 커지는 결과가 발생할 수 있으므로 해결 할 수 있는 두가지 다른 방법이 있다.

1. Preserve Attribute
```
class Foo
{
    [UnityEngine.Scripting.Preserve]
    public void UsingUnityPreserve(){}

    [CustomPreserve]
    public void UsingCustomPreserve(){}

    [Preserve]
    public void UsingOwnPreserve(){}
}
```
Preserve 속성을 추가하여 Stripping을 방지 할 수 있다.

2. Link XML
```
<linker>
	<assembly fullname="GameData" preserve="all"/>
</linker>
```
Assets/link.xml에 내용을 추가하여 Stripping을 방지 할 수 있다.

다음 [링크](https://docs.unity3d.com/Manual/ManagedCodeStripping.html)에서 좀 더 자세한 설명을 읽을 수 있다.