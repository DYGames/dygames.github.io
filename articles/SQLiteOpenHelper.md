# SQLiteOpenHelper

이번 안드로이드 오목 미션에서  SQLite를 사용하여 오목 정보를 저장하고 불러올 수 있게 하라는 요구 사항이 추가되었다.

이를 위해 SQLite를 사용하면서 SQLiteOpenHelper 클래스를 주로 사용하여 구현하게 되었는데, 이 클래스에 대해 더 자세히 알아보겠다.

## SQLite

SQLite는 이름에서 알 수 있다시피 SQL (Structured Query Language)를 로컬 디바이스에서 가볍게 사용할 용도로 개발된 DBMS (Database Management System) 이다.

## 생성자

```java
public SQLiteOpenHelper(
	@Nullable Context context, 
	@Nullable String name, 
	@Nullable SQLiteDatabase.CursorFactory factory, 
	int version) {
    throw new RuntimeException("Stub!");
}
```

기본 생성자는 다음과 같이 정의된다.

- context
    
    데이터베이스 경로를 찾기 위해 사용된다. null 가능하다.
    
- name
    
    데이터베이스 이름. 메모리 전용 데이터베이스에 대해선 null이 가능하다.
    
- factory
    
    Cursor 오브젝트를 만들기 위해 사용, null 가능하다.
    
- version
    
    데이터베이스의 버전을 나타낸다.
    

## 콜백 함수

### onCreate

```java
public abstract void onCreate (SQLiteDatabase db)
```

데이터베이스가 처음 생성됐을때만 호출된다. 테이블을 생성하고 초기 데이터를 설정하는데 주로 사용된다.

- db
    
    데이터베이스를 나타낸다.
    

### onUpgrade

```java
public abstract void onUpgrade (SQLiteDatabase db, 
                int oldVersion, 
                int newVersion)
```

데이터베이스가 업그레이드 되었을 때 호출된다. 이는 SQLiteOpenHelper의 생성자에 넘겨진 version 인자의 값이 기존 값보다 높을 때를 의미한다.

이 함수에서는 Table을 추가하거나 삭제 등을 하는데 주로 사용하고, 새로운 스키마 버전으로 업그레이드하는데 필요한 행동들을 수행한다.

- oldVersion
    
    변경되기 직전의 버전을 나타낸다.
    
- newVersion
    
    새로운 버전을 나타낸다.
    

### onOpen

```java
public void onOpen (SQLiteDatabase db)
```

데이터베이스가 열렸을 때 호출된다. 이는 onCreate, onUpgrade, onDowngrade, onConfigure 등이 모두 끝난 시점을 의미한다.

### onDowngrade

```java
public void onDowngrade (SQLiteDatabase db, 
                int oldVersion, 
                int newVersion)
```

onUpgrade와 비슷한 함수이다. 다른 점은 지금 version이 새로운 version보다 높을 때 호출된다.

### onConfigure

```java
public void onConfigure (SQLiteDatabase db)
```

데이터베이스 연결 설정이 완료되었을 때 호출된다. [write-ahead logging](https://en.wikipedia.org/wiki/Write-ahead_logging)이나 외부 키 설정 등을 할 때 사용된다. 이는 모든 함수 호출 전에 호출되므로 데이터베이스를 수정해선 안된다.

### 호출 순서

처음 SQLiteOpenHelper를 생성할 때

```java
D/SQLiteOpenHelperTest: onConfigure
D/SQLiteOpenHelperTest: onCreate
D/SQLiteOpenHelperTest: onOpen
```

version을 한 단계 올렸을 때

```java
D/SQLiteOpenHelperTest: onConfigure
D/SQLiteOpenHelperTest: onUpgrade
D/SQLiteOpenHelperTest: onOpen
```

## 속성

### *`databaseName`*

- 데이터베이스의 이름을 나타낸다.

### *`readableDatabase`*

- 데이터베이스를 생성하고/하거나 연다.
- 일반적인 상황에서는, `writableDatabase`와 같은 값을 반환하지만 다른 값을 반환하는 경우가 있다.
    - 디스크가 가득 찼을 때
    - read-only 데이터베이스를 요청 했을 때

### *`writableDatabase`*

- 읽고 쓰기가 가능한 데이터베이스를 생성하고/하거나 연다.
- 처음 호출되었을 때, onCreate, onUpgrade and/or onOpen을 호출한다.
- 데이터베이스가 생성되면, 캐싱된다.