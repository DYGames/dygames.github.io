# **안드로이드 / 게임 개발자 김도엽**

<div class="profile">
    <div class="profile-key">
        <img src="../images/img.jpg" style="width: 400px" alt="...">
    </div>
    <div class="profile-value">
        <md-block class="markdown-body">
            - 🎂 1999년 8월 26일
            - 📱 010-8988-1837
            - #️⃣ [https://github.com/DYGames](https://github.com/DYGames)
            - 📝 [https://dygames.github.io](https://dygames.github.io)
            - 📸 [https://instagram.com/dygames37](https://instagram.com/dygames37)
            - 📧 [dygames34@gmail.com](mailto:dygames34@gmail.com)
        </md-block>
    </div>
</div>
<br>

> 사용자에게 최종적으로 제공되는 형태의 프로그램과 그 기반 기술의 구현에 관심이 많습니다.
<div>
2015년부터 프로그래밍을 시작해 다양한 게임을 꾸준히 개발했습니다.
기존 게임 엔진의 구조를 분석하여 직접 <b>2D 게임 엔진을 제작</b>했고, 이를 이용해 게임을 제작하고 <b>전국기능경기대회</b>에 출전하여 수상하였습니다.
<br>
<br>
SW 개발병으로 복무하며 군 내에서 사용되는 프로그램을 재개발하는 업무를 맡았습니다. 책임감을 가지고 개발 한 결과 복무 기간동안 <b>2건의 대형 레거시 프로젝트</b>를 재개발하는데 성공했습니다.
<br>
또한 개인 시간에 다양한 분야의 개발을 접해보며 특히 <b>안드로이드 개발</b>에 흥미를 느꼈습니다.
<br>
<br>
안드로이드를 더 깊게 학습하고 싶어 <b>우아한테크코스</b>에 참여했고, 그곳에서 평소에 관심 많았던 음악 도메인과 결부하여 음악 추천 숏폼 서비스를 제작했고, <b>약 60명의 사용자</b>를 확보했습니다.
이때 영상 페이징을 쉽게 해주는 <b>커스텀 뷰를 제작</b>하고, 오픈소스화하여 배포까지 하였습니다.
<br>
<br>

[음반 수집](https://rateyourmusic.com/collection/dygames/)과 [기타 연주](https://www.youtube.com/channel/UC-qJ9aVGyR909i67bf_0jAQ)를 즐겨합니다. 최근엔 [포스트-하드코어](https://rateyourmusic.com/genre/post-hardcore/)를 가장 많이 듣고 있습니다.
<br>
</div>

<div>
    <h1>경력</h1>
    <div class="period">
    <div class="period-key">
    <h2>우아한테크코스<br>(2023.02 ~ 2023.11)</h2>
    <p>우아한형제들에서 운영하는 10개월 동안 진행되는 현장형 개발 인재 양성 프로그램입니다.</p>
    <p>Kotlin, Android, 객체지향, 클린 코드, 테스트등을 학습하였습니다.</p>
    <p>코드 리뷰, 페어 프로그래밍 등을 경험하고 팀 프로젝트를 통해 강도 높은 협업을 경험하였습니다.</p>
    </div>
    <div class="period-project">
        <md-block class="markdown-body">
            ## 🎵 [Diggin' Room](https://github.com/woowacourse-teams/2023-diggin-room)
            ### [🏪 Play Store](https://play.google.com/store/apps/details?id=com.digginroom.digginroom)
            `Android` `Kotlin` `MVVM` `RoomPager`
            ### 사용자 활동을 기반으로 음악을 추천하는 숏폼 컨텐츠 서비스
            - 아래로 스와이프하며 끊임없이 새로운 음악을 탐색
            - 마음에 들지 않는 음악은 옆으로 스와이프
            - 장르 기반으로 사용자가 좋아할 수 있는 음악을 예측해서 추천
            - 탐색하며 발견한 음악을 스크랩하여 저장
            - 음악 메타데이터 제공
            ### 🤙 역할
            - 초기 아이디어, 앱 전체 흐름을 기획
            - 안드로이드 아키텍쳐 구조, 추천 알고리즘 설계
            - RoomPager, Youtube Player 구현
            ### 🛠️ Troubleshooting
            #### 기존 RecyclerView, ViewPager등으론 숏폼 형태의 페이징 뷰 구현이 불가
            - 뷰 리사이클링, 영상 미리 로딩, 4방향 페이징, 부드러운 페이징을 제공하는 **RoomPager** Custom View 개발
            - Paging 상태에 따라 화면 밖의 YoutubePlayer 조작하여 최적의 숏폼 경험 제공
            #### 네트워크 요청, 도메인 로직 등의 수행 결과 로그 확인
            - 기존 코틀린의 Result 클래스를 활용한 LogResult 클래스 구현
            - Success, Failure 상황에서 설정한 채널 (콘솔, Firebase)등에 자동으로 로그 출력
            #### 복잡한, 많은 객체 의존 관계 표현의 어려움
            - 자동 DI 구현하여 어노테이션으로 의존 주입
            - Kotlin DSL 활용하여 의존 관계 표현 가능
            #### 서버 단의 음악 추천 알고리즘의 서비스 레이어 종속
            - 도메인 역할인 음악 추천 알고리즘을 의존성 분리
            - IoC로 도메인 레이어인 Repository 참조를 갖는 RoomRecommender 구현
            - 백엔드 인원과 토의 후 직접 [PR](https://github.com/woowacourse-teams/2023-diggin-room/pull/380)을 보내 설득
            ## ♻️ [RoomPager (Open Source)](https://github.com/DYGames/RoomPager)
            `Android` `Kotlin` `Custom View`
            ### 안드로이드 4방향 리사이클링 페이저 뷰 | [개발기](https://dygames.github.io/article.html?article=Android%EC%97%90%EC%84%9C%204%EB%B0%A9%ED%96%A5%20%EC%9E%AC%ED%99%9C%EC%9A%A9%20%EA%B0%80%EB%8A%A5%ED%95%9C%20%ED%8E%98%EC%9D%B4%EC%A7%95%20%EB%B7%B0%20%EB%A7%8C%EB%93%A4%EA%B8%B0%20+%20Youtube%20WebView%20%EC%9E%AC%EC%83%9D.md)
            - Diggin' Room 프로젝트에서 사용되는 페이징 뷰
            - RecyclerView와 흡사하게 Adapter, ViewHolder 구현으로 사용 가능
            - 뷰 재사용으로 성능 최적화
            - 4방향 스크롤로 제스쳐 구현 가능
            ### 🛠️ Troubleshooting
            #### ScrollView, HorizontalScrollView는 FrameLayout을 상속받아 scrollTo()와 같은 메소드를 재사용 불가
            - 두 스크롤뷰에서 공통적인 특징을 추출하여 추상화하고 RoomPager 로직에서 중복되는 코드 제거
            #### 뷰 재사용시 위해 9개의 뷰를 동시에 로딩하여 과부하 발생
            - 재사용할 뷰를 특정하도록 로직을 변경하여 3개의 뷰만 동시에 로딩하도록 하여 부하 최소화
        </md-block>
    </div>
    </div>
    <div class="period">
    <div class="period-key">
    <h2>육군본부 SW 개발병<br>(2020.01 ~ 2021.08)</h2>
    <p>육군에서 사용되는 프로그램의 유지보수, 재개발 임무를 수행했습니다.</p>
    </div>
    <div class="period-project">
        <md-block class="markdown-body">
            ## 🪖 장군인사관리체계 재개발
            `Visual Basic` `C#` `Winform`
            ### 군에서 사용되는 대규모 프로그램의 호환성 문제 해결을 위해 재개발
            - Visual Basic으로 작성된 코드를 해석하여 C# Winform으로 변환
            - Oracle DB, Excel등 기존 연동 기능도 호환되도록 재개발
            - 실시간 투표 기능을 위해 DB 폴링 구현
            ### 🛠️ Troubleshooting
            #### 문서와 인수자가 존재하지 않는 코드
            - 기존과 정확히 동일한 뷰와 로직 작동이 보장되도록 구현
            - VB을 학습하고, C# Winform에서 비슷하게 동작하는 컴포넌트들을 확인
            - 기존 코드 읽으며 C#으로 재작성하면서, 개선 할 수 있도록 `보이스카우트 법칙` 준수하며 작성
            #### Visual Basic에서 제공하는 문서 프린터 출력 함수가 C#에는 미제공
            - 문서를 프린터에 출력 할 수 있도록 직접 렌더링하는 기능 구현
            - 문서 양식을 지정한 뷰를 생성하고, 이 양식을 뷰와 프린터 양측에 출력하도록 함
            ## 🎸 [Tab-share](https://github.com/DYGames/tab-share)
            `React` `JS`
            ### 기타 악보를 웹에서 편집/재생 하는 서비스
            - .tab 악보 포맷 정의
            - HTML Canvas를 이용해 악보 표시
            - SoundFont를 이용해 여러 음색으로 악보 재생 가능
            <br>
            <iframe width="400" height="225"
                src="https://www.youtube.com/embed/cOPHI_Lp0rA">
            </iframe>
        </md-block>
    </div>
    </div>
    <div class="period">
    <div class="period-key">
    <h2>아몽 소프트웨어 인턴<br>(2019.06 ~ 2019.12)</h2>
    <p>교내 현장실습으로 6개월간 키즈카페 등에 설치되는 인터렉티브 미디어 컨텐츠를 개발하였습니다.</p>
    </div>
    <div class="period-project">
        <md-block class="markdown-body">
            ## 🧒 Doplex
            `Unity` `C#` `Kinect`
            ### 유아용 인터렉티브 미니게임 서비스
            - 키즈카페, 박람회 등에서 빔 프로젝터로 투사된 영상에 볼풀 공을 던져 진행하는 게임
            - Kinect 센서 값을 이용해 볼 터치를 인식하고 이를 게임과 연결하여 게임 동작
            - 유아가 이용하기 적합한 게임 주제, 난이도, UI 등을 설정하고 여러 미니 게임을 제작
            - 전국 키즈카페에 실제 센서, 게임 설치 후 유지보수
            ### 🛠️ Troubleshooting
            #### 게임 파일의 불법 복제에 대응 불가능
            - 설치 기기의 MAC 주소를 검증하여 실제 구매한 고객만 사용할 수 있도록 하는 인증 시스템 개발
            #### 전국의 게임이 설치되어 있는 곳에 업데이트를 제공
            - 자동 패치 시스템 구현
            - 새로운 버전 출시시 최초 실행시 자동으로 업데이트하도록 구현
        </md-block>
    </div>
    </div>
    <h1>수상</h1>
    <div class="period">
    <div class="period-key">
    <h2>우송대학교 KWC 은상<br>(2017.08)</h2>
    <p>학교에서 친구들과 진행한 팀 프로젝트의 결과물을 KWC 대회에 제출해 은상을 수상했습니다.</p>
    <p>프로젝트에서는 초기 기획을 담당하고 팀장 역할을 맡아 프로그래밍을 주도했습니다.</p>
    <p>UI, 게임 규칙, 타일링, 타워 설치, 시점 전환, 플레이어 이동 등 게임 전반을 대부분 구현하였습니다.</p>
    </div>
    <div class="period-project">
        <md-block class="markdown-body">
            ## 🫐 [LotisBerry](https://github.com/DYGames/LotisBerry)
            `Unity` `C#` `3D` `Post-Processing`
            ### 과일 나무를 지키는 3D 타워 디펜스 게임
            - Tile 구조로 맵 상에 타워를 배치
            - NavMesh를 이용해 적의 이동 경로, 타겟 우선순위 결정
            - Top-View, Quarter-View 시점 전환
            - 마우스 포인팅에 따른 플레이어 총구 겨냥 애니메이션 구현
            ### 🛠️ Troubleshooting
            #### 시점 전환시 자연스러운 효과
            - Camera의 ProjectionMatrix를 가져와 행렬에 대한 선형 보간 수행
            - Coroutine을 이용해 보간 값을 Camera에 적용
            #### NavMeshAgent가 목표 타워에 도달하더라도 멈추지 않고 공격을 하지 않는 문제
            - NavMeshAgent의 Stop Distance를 설정하고 일정 거리 이상 도달시 멈추도록 설정
            <br>
            <iframe width="400" height="225"
                src="https://www.youtube.com/embed/feGyPshVzlU">
            </iframe>
        </md-block>
    </div>
    </div>
    <div class="period">
    <div class="period-key">
    <h2>전국기능경기대회 게임개발직종 동메달<br>(2016.09)</h2>
    <p>DirectX를 이용하여 주어진 기획을 바탕으로 게임을 제작하는 대회입니다.</p>
    <p>직접 제작한 프레임워크에서 완성도 있는 게임을 빠르게 제작하여 은상을 수상하였습니다.</p>
    </div>
    <div class="period-project">
        <md-block class="markdown-body">
            ## 🖥️ [DirectX 2D Game Engine](https://github.com/DYGames/SkillOlympic_Medieval)
            `C++` `2D` `DirectX`
            ### 대회에서 빠르게 게임을 제작 할 수 있도록 제작한 프레임워크
            - Cocos2d-x 엔진을 분석하여 필요한 컴포넌트를 특징하고 구조를 구상
            - Tree 구조의 Game Object 관리
            - 화면 전환을 위한 Scene
            - 2D Sprite Animation
            - 2D Sprite Rendering
            - Input System
            - 2D 물리, 충돌
        </md-block>
    </div>
    </div>
    <div class="period">
    <div class="period-key">
    <h2>한국게임과학고등학교 학교장배 교내 게임제작대회 금상<br>(2015.11)</h2>
    <p>교내에서 개최된 게임제작대회에서 2D 게임을 제작해 금상을 수상했습니다.</p>
    <p>팀장과 리드 프로그래머를 맡아 게임 전반적인 기능을 관리하고 구현하였습니다.</p>
    </div>
    <div class="period-project">
        <md-block class="markdown-body">
            ## 🍣 [Sushimasen](https://github.com/DYGames/Sushimasen)
            `C++` `2D` `Cocos2d-X`
            ### 초밥 가게를 운영하는 타이쿤 게임
            - 조리, 서빙 두 가지 화면으로 구성
            - 조리 탭에선 손님이 주문한 요리를 조합법에 따라 제작
            - 요리를 많이 제작할수록 조합법이 해금되어 더 많은 수익 창출 가능
            - 빠른 시간 내에 손님에게 서빙하지 않으면 평판 하락
            ### 🛠️ Troubleshooting
            #### 전역에서 관리되어야하는 시간, 금액 등의 데이터 관리
            - Singleton 패턴을 이용하여 필요한 곳에서 접근 가능하도록 구현
        </md-block>
    </div>
    </div>
</div>

# 기술
### 핵심 가치
- 프로그래밍과 음악, 그리고 이들을 **만드는 것**을 좋아합니다.
- 문제의 **본질**을 파악하고 기술에 얽매이지 않는, 근본적인 해결을 위해 **끈기**있게 노력합니다.
- 확장성, 재사용성이 높고 변화에 대응할 수 있는 **견고**한 코드를 중요시 합니다.
- 코드로 **부드러운 사용자 경험**과 **고객 가치**를 제공하고자 합니다.

### Android & Kotlin
- 안드로이드 컴포넌트를 이용해 요구사항을 해결하는데 어려움이 없습니다.
- 안드로이드 아키텍쳐 권장사항를 이해하고 구현에 적절하게 활용 할 수 있습니다.
- UI, Domain, Data 레이어 간의 역할을 이해하고 적절한 책임을 부여하기 위해 고민합니다.
- MVC, MVP, MVVM 각 아키텍쳐 패턴의 정의와 차이를 이해하고 앱의 규모, 요소에 따라 적절한 패턴을 선택 할 수 있습니다.

### 테스트
- TDD의 개발 사이클을 이해하고 이를 반복하며 신뢰할 수 있는 코드를 작성 할 수 있습니다.
- JUnit을 이용해 테스트 코드를 작성할 수 있습니다.
- 좋은 테스트 코드에 대한 깊은 고민을 하고 견고한 코드를 위해 적절한 테스트를 작성 할 수 있습니다.
- 테스트 더블을 학습하면서 MockK를 이용한 Mock 객체, Fake 객체 구현 등을 적용했습니다.
- Robolectric으로 안드로이드 의존성을 갖는 테스트를 구현하고 통합 테스트를 작성할 수 있는 방법을 고안했습니다.

### 협업
- 코드 리뷰나 페어 프로그래밍을 적극 활용하여 코드를 작성하고 개선합니다.
- 팀원의 코드는 팀의 코드라고 생각하고, 책임감을 가지고 하나의 제품을 만듭니다.
- 팀의 발전을 위해 필요한 의견이라고 생각되면 설득력있게 정리하여 제안합니다.

### Unity & C#

### C++

# 학력

### 국민대학교 소프트웨어학부 입학 (2018.03)
### 한국게임과학고등학교 컴퓨터게임개발과 졸업 (2018.02)
