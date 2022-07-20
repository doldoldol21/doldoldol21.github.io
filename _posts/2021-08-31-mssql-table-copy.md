---
layout: post
title: MSSQL 테이블 복사하기
subtitle: mssql table copy
# cover-img: /assets/img/cover5.jpg
thumbnail-img: ""
comments: true
tags: [MSSQL, Table, 기록]
last-updated: 2021-08-31
---

<br>

### 테이블 복사 (새로운 테이블을 생성하면서 데이터도 추가)

<br>

```sql
SELECT * INTO [새로만들 테이블] FROM [복사할 테이블]
```

{: .box-warning} 
새로 만들어지는 테이블에 PRIMARY KEY, index, default, foreign Key 등 테이블의 제약조건은 복사되지 않습니다.

<br/>

원하는 컬럼만 가지고 새로운 테이블을 생성하려면 일반 select쿼리처럼
컬럼을 적어주시면돼요.
```sql
SELECT column1, column2 INTO [새로만들 테이블] FROM [복사할 테이블]
```

<br/>


위의 두 쿼리들은 테이블을 새로 생성하면서 데이터도 추가하는 쿼리인데요.

다음은 테이블의 구조만 복사하면서 새로운 테이블을 만드는 쿼리에요😀

```sql
SELECT * INTO [새로만들 테이블] FROM [복사할 테이블] WHERE 1 = 2
```

이런식으로 where문에 조건을 false를 걸어주시면돼요.

여기까지가 테이블의 복사였구요 여기서 중요한 부분은
```sql
SELECT INTO FROM
```

요 골격만 생각하시면돼요!

<br/>

번외로 이미 있는 테이블에 *SELECT*한 데이터들을 넣는 쿼리입니다.😁

```sql
CREATE TABLE member(
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(10)
)

INSERT INTO member (name) VALUES
('kim'),
('park'),
('lee')

SELECT *
FROM member
```

<br/>

id|name
---|---
1|kim
2|park
3|lee

이렇게 데이터들이 있는 테이블에 그대로 똑같은 데이터를 넣어볼게요.

```sql
INSERT INTO member (name)   -- values는 빠져요.
SELECT name
FROM member
```

<br/>

id|name
---|---
1|kim
2|park
3|lee
4|kim
5|park
6|lee

이런식으로 *SELECT*를 이용하여 데이터를 복사(?), 삽입할 수 있습니다.

