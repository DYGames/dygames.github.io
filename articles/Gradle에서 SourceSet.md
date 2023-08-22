# Gradle에서 SourceSet

Gradle에서 SourceSet은 자바 소스와 리소스 파일을 포함하는 논리적 집단을 나타낸다.

핵심 아이디어는 소스파일과 리소스는 어플리케이션 코드, 단위 테스트, 통합 테스트 등과 같은 종류에 따라 그룹지어지는 것이다. 각 논리적 그룹은 주로 각각의 파일 종속, 클래스패스 등을 가진다.

중요한건 Source Set을 이루는 파일이 같은 디렉토리에 위치할 필요는 없는 것이다.

SourceSet의 구성 요소

- 소스 파일과 그 위치
- 필수 종속성이 포함된 컴파일 classpath
- 컴파일된 클래스 파일이 위치되는 곳

Gradle에서는 빌드 할 때 이 구성 요소들을 이용해 빌드를 진행한다.

이때 참조하는 소스 코드의 디렉터리는 기본으로 `src/main/java`로 설정되어있다.

이때 우리가 빌드하고 싶은 소스 코드를 추가하려면, 해당 모듈의  `build.gradle`에서 아래와 같은 코드를 추가해주면 된다.

```groovy
sourceSets {
	main {
		java {
			srcDir "src/$name/kotlin"
		}
	}
}
```

```groovy
sourceSets {
	main.java.srcDirs += "src/$name/kotlin"
}
```

```groovy
sourceSets.all {
    kotlin.srcDir("src/$name/kotlin")
}
```

이때 $name은 추가하려는 SourceSet의 이름을 나타내는데, Android의 sourceSets 같은 경우 아래와 같은 name들을 가지고 있다.

```groovy
androidTest
androidTestDebug
androidTestRelease
debug
main
release
test
testDebug
testFixtures
testFixturesDebug
testFixturesRelease
testRelease
```

이로 인해

- `src/main/kotlin`
- `src/androidTest/kotlin`
- `src/test/kotlin`

등의 폴더를 SourceSets에 추가하고, 빌드에 포함할 수 있게 된 것이다.