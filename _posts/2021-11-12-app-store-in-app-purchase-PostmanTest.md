---
layout: post
title: 앱 스토어 영수증 검증 테스트 with Postman
subtitle: App Store Receipt Verification Test with Postman
# cover-img: /assets/img/cover6.jpg
thumbnail-img: ""
comments: true
tags: [AppStore, 기록]
last-updated: 2021-11-12
---


앱 스토어 인앱 상품 영수증을 가지고 검증이 되는지 테스트를 해봐야 할 때,

보내야 하는 형식이 잘 표기되어있지 않아서 그냥 form 형식으로 보냈다가 에러 코드 본 적이 많아서 제가 나중에 꺼내볼려고 만든 포스트입니다😀


[영수증 검증 documen](https://developer.apple.com/documentation/appstorereceipts){:target="_blank"}


[영수증 검증 리턴 status 설명 있는 주소](https://developer.apple.com/documentation/appstorereceipts/status){:target="_blank"}



<br>

테스트할 때는 POST, Body 전송방식은 raw이고 형식은 JSON 입니다.

***POST, raw, JSON***

<br>

[!['Postman Send example'](/assets/img/postdata/appstorereceiptsTest.png)](/assets/img/postdata/appstorereceiptsTest.png){: width="100%"}




감사합니다😍