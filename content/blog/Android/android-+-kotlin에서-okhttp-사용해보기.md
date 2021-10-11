---
title: Android + Kotlin에서 Okhttp 사용해보기
date: 2021-10-11 18:10:86
category: Android
thumbnail: { thumbnailSrc }
draft: false
---

import Code from "../../../src/components/code.js"

# [Okhttp](https://github.com/square/okhttp)란?
Android에서 HTTP 통신을 도와주는 Java 라이브러리이다. 물론 Kotlin에서도 동작한다.

App Module의 build.gradle에 종속성을 추가해준다.
```js
dependencies {
    implementation "com.squareup.okhttp3:okhttp:4.9.0"
    ...
}
```

Android API 28부터 HTTPS가 아닌 HTTP에 대한 접속은 제한되었다. HTTP를 사용할 계획이면 AndroidManifext.xml의 application 태그에 다음 라인을 추가한다.

```xml
<application
        ...
        android:usesCleartextTraffic="true">
        ...
    </application>
```

## GET

```js
    val client = OkHttpClient()
    client.newCall(Request.Builder().url("http://10.0.2.2:3000/categories").build()).enqueue(
        object : Callback {
            override fun onFailure(call: Call, e: IOException) {
            }
            override fun onResponse(call: Call, response: Response) {
                Thread {
                    val jsonObject: JSONObject = JSONObject(response.body?.string())
                    val dataArray: JSONArray = jsonObject.getJSONArray("data")
                    for (i in 0 until dataArray.length()) {
                        val dataObject = dataArray.getJSONObject(i)
                        UserData.categories.add(dataObject.getString("title"))
                    }
                }.start()
            }
        })", language>
```
Builder 패턴을 사용하여 손쉽게 통신을 정의하고 Response를 Control할 수 있다.

주의할 점은 onFailure는 response를 받아오는 것에 실패했을때 실행되는 콜백이지, code가 200임을 의미하는 것은 아니다.

## POST

```js
    val rb = FormBody.Builder()
        .add("id", id.toString())
        .add("title", findViewById<TextView>(R.id.upload_title).text.toString())
        .add(
            "category",
            findViewById<Spinner>(R.id.upload_category).selectedItemId.toString()
        )
        .add("descr", findViewById<TextView>(R.id.upload_desc).text.toString())
        .add("price", findViewById<TextView>(R.id.upload_price).text.toString())
        .build()
    client.newCall(
        Request.Builder().addHeader("Content-Type", "application/x-www-form-urlencoded").url("http://10.0.2.2:3000/product").put(rb).build()
    ).enqueue(object :
        Callback {
        override fun onFailure(call: Call, e: IOException) {
        }
        override fun onResponse(call: Call, response: Response) {
            Thread {
                finish()
            }.start()
        }
    })
```

PUT, DELETE 통신도 가능하다.