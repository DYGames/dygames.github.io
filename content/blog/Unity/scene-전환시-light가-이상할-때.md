---
title: Scene 전환시 Light가 이상할 때
date: 2021-11-29 21:11:89
category: Unity
thumbnail: { thumbnailSrc }
draft: false
---

Unity에서 SceneManager.LoadScene() 을 이용해 Scene을 전환 할 시, Scene의 Light가 고장나는 버그가 있다.

![Photo](./post-with-picture1/1.png)

이런 경우 Scene의 Light를 Bake해서 문제를 해결 할 수 있다.

![Photo](./post-with-picture1/2.png)

Window/Rendering/Lighting

![Photo](./post-with-picture1/3.png)

Lighting 창에서 Generate Lighting 버튼을 눌러 Bake한다.

![Photo](./post-with-picture1/4.png)

Light가 정상적으로 나타난다.