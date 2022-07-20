---
layout: post
title: MSSQL 텍스트로 프로시저 찾기
subtitle: Let's find Procedures by Text !
# cover-img: /assets/img/cover1.jpg
thumbnail-img: ""
comments: true
tags: [MSSQL, Procedure]
last-updated: 2021-08-13
---

안녕하세요 :)

오늘은 제가 일을하면서 굉장히 자주 사용하는 쿼리에요.

제가 관리하는 DB는 프로시저가 약 200개 정도 되는데요.

가끔 필요한 쿼리문을 찾거나 수정해야하는데 어떤 프로시저에 있는 쿼리인지 헷갈릴때 쓰는 방법입니다🤩

```sql
SELECT * 
FROM sys.procedures 
WHERE OBJECT_DEFINITION(object_id) LIKE '%Text%'
```
Text 이부분 대신 제가 찾고자 하는 텍스트를 넣어 실행시키면 Text를 포함하는 프로시저의 목록들이 출력돼요!
