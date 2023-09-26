# 김도엽

📱 010-8988-1837

#️⃣ [https://github.com/DYGames](https://github.com/DYGames)

📧 [dygames34@gmail.com](mailto:dygames34@gmail.com)

> **안드로이드 / 게임 개발자, 기타리스트**
- 프로그래밍과 음악, 그리고 이들을 만드는 것을 좋아합니다.
- 문제의 **본질**을 파악하고 근본적인 해결을 위해 **끈기**있게 노력합니다.
- 확장성, 재사용성이 높고 변화에 대응할 수 있는 **견고**한 코드를 중요시 합니다.
- 팀원의 코드는 팀의 코드라고 생각하고, **책임감**을 가지고 하나의 **제품**을 만듭니다.
- 코드로 **부드러운 사용자 경험**과 **고객 가치**를 제공하고자 합니다.

<div>
    <h1>경력</h1>
    <div style="display: inline-block;width: 30%;float: left;">
    <h2>우아한테크코스<br>(2023.02 ~ 2023.11)</h2>
    <p>우아한형제들에서 운영하는 9개월 동안 진행되는 현장형 개발 인재 양성 코스입니다.</p>
    <p>Kotlin, Android, 객체지향, 클린 코드, 테스트등을 학습하였습니다.</p>
    <p>코드 리뷰, 페어 프로그래밍 등을 경험하고 팀 프로젝트를 통해 강도 높은 협업을 경험하였습니다.</p>
    </div>
    <div style="display: inline-block;width: 65%;margin-left: 5%;margin-top: 24px">
        <md-block class="markdown-body">
            ## 🎵 [Diggin' Room](https://github.com/woowacourse-teams/2023-diggin-room)
            ### 사용자 활동을 기반으로 음악을 추천하는 숏폼 컨텐츠 서비스
            - 아래로 스와이프하며 끊임없이 새로운 음악을 탐색
            - 마음에 들지 않는 음악은 옆으로 스와이프
            - 장르 기반으로 사용자가 좋아할 수 있는 음악을 예측해서 추천
            - 탐색하며 발견한 음악을 스크랩하여 저장
            - 댓글, 곡 정보 등 메타데이터 제공
            ### Troubleshooting
            #### 기존 RecyclerView, ViewPager등으론 숏폼 형태의 페이징 뷰 구현이 불가
            - 뷰 리사이클링, 영상 미리 로딩, 4방향 페이징, 부드러운 페이징을 제공하는 **RoomPager** Custom View 개발
            - Paging 상태에 따라 화면 밖의 YoutubePlayer 조작하여 최적의 숏폼 경험 제공
            #### MVVM의 Binder 계층 구현을 위한 BindingAdapter의 캡슐화 불가, View와 의존 발생
            - UI State 도입
            - 단방향 데이터 흐름 보장
            ## ♻️ [RoomPager (Open Source)](https://github.com/DYGames/RoomPager)
            ### 안드로이드 4방향 리사이클링 페이저 뷰 | [개발기](https://dygames.github.io/article.html?article=Android%EC%97%90%EC%84%9C%204%EB%B0%A9%ED%96%A5%20%EC%9E%AC%ED%99%9C%EC%9A%A9%20%EA%B0%80%EB%8A%A5%ED%95%9C%20%ED%8E%98%EC%9D%B4%EC%A7%95%20%EB%B7%B0%20%EB%A7%8C%EB%93%A4%EA%B8%B0%20+%20Youtube%20WebView%20%EC%9E%AC%EC%83%9D.md)
            - Diggin' Room 프로젝트에서 사용되는 페이징 뷰
            - RecyclerView와 흡사하게 Adapter, ViewHolder 구현으로 사용 가능
            - 뷰 재사용으로 성능 최적화
            - 4방향 스크롤로 제스쳐 구현 가능
            ### Troubleshooting
            #### ScrollView, HorizontalScrollView는 FrameLayout을 상속받아 scrollTo()와 같은 메소드를 재사용 불가
            - 두 스크롤뷰에서 공통적인 특징을 추출하여 추상화하고 RoomPager 로직에서 중복되는 코드 제거
            #### 뷰 재사용시 위해 9개의 뷰를 동시에 로딩하여 과부하 발생
            - 재사용할 뷰를 특정하도록 로직을 변경하여 3개의 뷰만 동시에 로딩하도록 하여 부하 최소화
        </md-block>
    </div>
    <div style="display: inline-block;width: 30%;float: left;">
    <h2>육군본부 SW 개발병<br>(2020.03 ~ 2021.08)</h2>
    <bold>육군본부 SW 개발병은 설명</bold>
    </div>
    <div style="display: inline-block;width: 65%;margin-left: 5%;margin-top: 24px">
        <md-block class="markdown-body">
            ## 🪖 장군인사관리체계 재개발
            ### Visual Basic으로 작성된 대형 레거시 프로젝트를 C# Winform으로 재개발
            ### Troubleshooting
            - djf
            ## 🎸 [Tab-share](https://github.com/DYGames/tab-share)
            ### 기타 악보를 웹에서 편집/재생 하는 서비스
            ### Troubleshooting
            - .tab 악보 포맷 정의
            - SoundFont를 이용해 여러 음색으로 악보 재생 가능
            https://youtu.be/cOPHI_Lp0rA
        </md-block>
    </div>
    <div style="display: inline-block;width: 30%;float: left;">
    <h2>아몽 소프트웨어 인턴<br>(2019.06 ~ 2019.12)</h2>
    <bold>키즈카페용 인터렉티브 미디어 컨텐츠 개발</bold>
    </div>
    <div style="display: inline-block;width: 65%;margin-left: 5%;margin-top: 24px">
        <md-block class="markdown-body">
            ## 🧒 Doplex
            ### Xbox Kinect를 이용한 유아용 인터렉티브 미니게임
            - 키즈 카페, 박람회 납품용
            - 게임 컨텐츠 개발 담당
                - 10종의 미니 게임 개발
            - 주 사용자 층에 적절한 난이도, 디자인, UX 설계
            - 전국 키즈카페에 실제 센서, 게임 설치 후 유지보수
            ### Troubleshooting
            - asd
        </md-block>
    </div>
</div>

# 기술

### Android & Kotlin
- MVC, MVP, MVVM 각 아키텍쳐 패턴의 정의와 차이를 이해하고 앱의 규모, 요소에 따라 적절한 패턴을 선택 할 수 있습니다.
- 기능 구현을 위해 필요한 요소를 빠르게 파악하고, 필요하다면 커스텀 뷰 등을 적극적으로 개발합니다.
- 코틀린을 

### 객체지향 & 클린 코드
- 재사용 가능하고 유지보수 가능한 코드를 위해 많은 고민을 하고 리팩터링합니다.
    - 클래스에 적절한 역할을 분배하고 책임을 부여할 수 있습니다.
    - 디자인 패턴을 적재적소에 활용 할 수 있습니다.
- TDD의 개발 사이클을 이해하고 이를 반복하며 신뢰할 수 있는 코드를 작성 할 수 있습니다.
- 유닛, 통합, UI 테스트 등 다양한 테스트의 필요성을 인지하고 작성 할 수 있습니다.
- 좋은 테스트 코드에 대한 깊은 고민을 하고 견고한 코드를 위해 적절한 테스트를 작성 할 수 있습니다.

### 협업
- 코드 리뷰나 페어 프로그래밍을 적극 활용하여 코드를 개선합니다.

# 학력

**국민대학교 소프트웨어학부 입학 (2018.03)**

**한국게임과학고등학교 졸업 (2018.02)**

# 수상

<div>
    <div style="display: inline-block;width: 30%;float: left;">
    <h2>우송대학교 KWC 은상<br>(2017.08)</h2>
    <bold>우아한테크코스는 설명</bold>
    </div>
    <div style="display: inline-block;width: 65%;margin-left: 5%;margin-top: 24px">
        <md-block class="markdown-body">
            ## 🫐 [LotisBerry](https://github.com/DYGames/LotisBerry)
            ### 과일 나무를 지키는 타워 디펜스 게임
            - Unity, C#
            - 3D, Top-View, Quarter-View 시점 전환
            - Unity PostProcessing
            https://youtu.be/feGyPshVzlU
            ### Troubleshooting
            - d
        </md-block>
    </div>
    <div style="display: inline-block;width: 30%;float: left;">
    <h2>전국기능경기대회 게임개발직종 동메달<br>(2016.09)</h2>
    <bold>DirectX를 이용하여 주어진 기획을 바탕으로 게임을 제작하는 대회</bold>
    </div>
    <div style="display: inline-block;width: 65%;margin-left: 5%;margin-top: 24px">
        <md-block class="markdown-body">
            ## 🖥️ [DirectX Framework](https://github.com/DYGames/SkillOlympic_Medieval)
            ### 자체 제작한 프레임워크 위에서 대회를 위한 게임 제작
            - Cocos2d-x 엔진을 분석
            - Tree 구조의 Game Object 관리
            - Scene
            - Animation
            - Sprite
            - TileMap
            ### Troubleshooting
            - d
        </md-block>
    </div>
    <div style="display: inline-block;width: 30%;float: left;">
    <h2>한국게임과학고등학교 학교장배 교내 게임제작대회 금상<br>(2015.11)</h2>
    <bold>우아한테크코스는 설명</bold>
    </div>
    <div style="display: inline-block;width: 65%;margin-left: 5%;margin-top: 24px">
        <md-block class="markdown-body">
            ## 🍣 [Sushimasen](https://github.com/DYGames/Sushimasen)
            ### 초밥 가게를 운영하는 타이쿤 게임
            - Cocos2d-X 엔진으로 개발
            - 전역 데이터 관리를 위해 Singleton 패턴 사용
            ### Troubleshooting
        </md-block>
    </div>
</div>
