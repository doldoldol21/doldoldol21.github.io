---
layout: post
title: MSSQL MERGE 활용하기
subtitle: INSERT, UPDATE, DELETE를 한번에 해보자!
# cover-img: /assets/img/path.jpg
thumbnail-img: ""
#share-img: /assets/img/path.jpg
#gh-repo: daattali/beautiful-jekyll
#gh-badge: [star, fork, follow]
comments: true
tags: [MSSQL]
last-updated: 2021-08-13
social-share: true
---

안녕하세요 여러분 제 블로그의 첫 게시물이네요 :)

현업에서 그리 자주 쓰이지는 않지만 알고있으면 유용한 쿼리인 오늘의 주인공은 merge 입니다!

merge 우리가 잘 알고있는 CRUD 중에서 데이터를 변경하는 

>  INSERT, update, DELETE

쿼리들을 하나의 쿼리에서 할 수 있는 쿼리입니다.

예제를 위해 테이블을 만들고 기본 데이터를 추가하겠습니다.

~~~~sql
CREATE TABLE person (
    id INT PRIMARY KEY, --PK
    name VARCHAR(10),   --이름
    age SMALLINT        --나이
    
)
~~~~
테이블 person을 만들고 한개 더 만들도록 할게요

~~~~sql
CREATE TABLE wallet (
    pid INT PRIMARY KEY,    --person 테이블의 PK
    money INT               --돈
)
~~~~

person 테이블의 PK인 id를 참조하는 wallet 테이블을 만들었습니다.

(wallet 테이블에서 person의 id로 외래키(FK)를 안걸어줬지만 보통의 경우는 외래키를 걸고 해요)

이제 데이터를 추가하도록 하겠습니다.

~~~sql
INSERT INTO person (id, name, age) VALUES
(1, 'Tom', 15),
(2, 'Mary', 14),
(3, 'Son', 17)
~~~

~~~sql
INSERT INTO wallet (pid, money) VALUES
(1, 5000),
(2, 30000),
(3, 1000)
~~~
### person

|id | name | age|
|---| ---  | ---|
|1  | Tom  | 15|
|2  | Mary | 14|
|3  | Son  | 17|

### wallet

|pid | money|
|---| ---|
|1  | 5000 |
|2  | 30000|
|3  | 1000 |

EX1) person테이블에서 나이가 10살 이상인 사람들을 wallet테이블에서 money를 1000을 뺀 다음 0이 되는 데이터는 삭제하는 쿼리를 만들어 볼게요.

> merge 쿼리문을 쓰기 전 쿼리문 제일 앞에 세미콜론(;)을 붙여주세요 그전에 써져있는 쿼리문들에 의해 구문 오류가 나올 수 있습니다.

~~~sql
;MERGE INTO wallet AS A
USING (SELECT * FROM person) AS B
ON A.pid = B.id AND B.age >= 10
WHEN MATCHED AND (A.money - 1000) >= 100 THEN
	UPDATE SET A.money -= 1000
WHEN MATCHED AND (A.money - 1000) = 0 THEN
	DELETE;
~~~
이렇게 1000의 값을 빼고도 100 이상의 money가 있는 데이터는 update를 진행하고,

데이터의 money가 1000이라면 delete를 하게되는 쿼리입니다.

EX1 Result)
### wallet

|pid | money|
|---| ---|
|1  | 4000 |
|2  | 29000|

> wallet 테이블이 merge가 되는 주 테이블이므로 변화는 wallet 테이블에만 있습니다.


한줄씩 해석해볼게요 :)

~~~sql
;MERGE INTO wallet AS A
USING (SELECT * FROM person) AS B
~~~

wallet 테이블을 merge 대상테이블로 잡고 A로 alias(별명)를 줬어요

조건을 걸거나 데이터를 참고해야하는 테이블이 using절 안으로 들어가고 B라는 alias를 줬어요. merge문에 꼭 두개의 테이블이 필요한 건 아니에요. 

대상테이블 하나로 하는 예제는 2번에서 해볼게요.

~~~sql
ON A.pid = B.id AND B.age >= 10
~~~

이 부분은 쉽게 대상테이블의 where에 해당한다고 보시면 되는데 저는 두 테이블을 연결시켜주고 나이 10살 이상의 조건을 걸었어요.

~~~sql
WHEN MATCHED AND (A.money - 1000) >= 100 THEN
	UPDATE SET A.money -= 1000
~~~

제일 중요한 부분이죠 update, INSERT, DELETE 의 조건을 나눠주는 거에요.

when 과 (matched / not matched) 그리고 THEN 은
필수로 들어가야 해요.

matched 는 우리가 ON 절에서 걸어주었던 조건
> A의 pid와 B의 id가 같고 B의 age가 10 이상

에 해당하는 데이터 행을 가르키고,

not matched 는 조건에 해당하지 않는 나머지 데이터 행을 가르켜요.


이 부분을 해석하자면

> match인 데이터들 중 money에서 1000을 뺀 값이 100이상인 데이터는 money에서 1000을 뺀 값으로 update 해라.

이렇게 되는거죠.

이미 조건이 다 나열되어있기 때문에, update절에 where는 들어갈 수 없어요.

> update <br/>
> set A.money -= 1000 ~~where pid = 1~~

다음 DELETE 구문이에요.

~~~sql
WHEN MATCHED AND (A.money - 1000) = 0 THEN
	DELETE;
~~~
위의 update 부분과 상당히 유사하죠? 

이것도 간단하게 해석해볼게요.
> match인 데이터들 중 money에서 1000을 뺀 값이 0인 데이터는 삭제해라.

이제 예제1의 쿼리분석은 끝났고 마지막으로 중요한 게 하나 있어요.
> merge쿼리는 끝날 때 반드시 세미콜론(;)을 찍어주세요.

mssql의 쿼리들은 세미콜론이 필수가 아니라 선택이지만
merge쿼리는 반드시 찍어주셔야 해요.

그래서 저는 앞뒤로 꼭 세미콜론(;)을 찍어주고 있습니다 :)

2번 예제 들어가기에 앞서 현재 테이블 두개의 데이터 상황입니다.

### person

|id | name | age|
|---| ---  | ---|
|1  | Tom  | 15|
|2  | Mary | 14|
|3  | Son  | 17|

### wallet

|pid | money|
|---| ---|
|1  | 4000 |
|2  | 29000|

EX2) wallet 테이블 money가 10000 이상이면 1000의 값을 더해주는 쿼리를 만들어볼게요.

2번 예제에서는 대상 테이블 하나로만 merge 하는 쿼리를 짜볼려고해요.

~~~sql
;MERGE INTO wallet AS A
USING (SELECT 1 AS dual) AS B
ON A.money >= 10000
WHEN MATCHED THEN
	UPDATE SET money += 1000;
~~~

EX2 Result)
### person

|id | name | age|
|---| ---  | ---|
|1  | Tom  | 15|
|2  | Mary | 14|
|3  | Son  | 17|

### wallet

|pid | money|
|---| ---|
|1  | 4000 |
|2  | 30000|

여기서 봐야 할 것은

> USING (SELECT 1 AS dual) AS B

이 부분이에요.

select절에 from이 없으니 테이블이 아니고

제가 임시로 변수를 만들어 줬다고 생각하시면 돼요.

<br/>
이 쿼리는 대상 테이블 하나만 있는 경우 INSERT, update, DELETE 쿼리를 하나의 쿼리에서 처리하고 싶은 경우 사용하는 예제라고 할 수 있어요.

~~예제를 잘 못짜서 update밖에 하지 못했어요..ㅜㅜ~~
<br/>
<br/>

이제 마지막 예제입니다.
insert절도 넣어서 해볼게요.

현재 상황
### person

|id | name | age|
|---| ---  | ---|
|1  | Tom  | 15|
|2  | Mary | 14|
|3  | Son  | 17|

### wallet

|pid | money|
|---| ---|
|1  | 4000 |
|2  | 30000|

EX3) wallet 테이블 money 값에 1000씩 더해주고 wallet에 없는 `person.id` 데이터가 있다면 INSERT 해주는 쿼리를 만들어 볼게요.

~~~sql
;MERGE INTO wallet AS A
USING (SELECT * FROM person) AS B
ON A.pid = B.id
WHEN MATCHED THEN
	UPDATE SET money += 1000
WHEN NOT MATCHED THEN
	INSERT VALUES (B.id, 1000);
~~~

EX3 Result)

### person

|id | name | age|
|---| ---  | ---|
|1  | Tom  | 15|
|2  | Mary | 14|
|3  | Son  | 17|

### wallet

|pid | money|
|---| ---|
|1  | 5000 |
|2  | 31000|
|3  | 1000|

> 원래 있던 pid (1,2)의 money는 1000씩 증가하였고 1번 예제에서 삭제되었던 pid 3은 INSERT 되었어요.


<br/>
여기서 merge쿼리에 대한 예제는 끝내도록 하겠습니다.

merge쿼리를 잘 사용하면 현업에서도 유용하게 쓰일 수 있을 것 같아요 :0

혹시 제가 설명한 부분이나 예제에서 오류가 있거나 수정사항 등이 있으면 피드백 부탁드립니다! 피드백은 사랑입니다

<br/>

