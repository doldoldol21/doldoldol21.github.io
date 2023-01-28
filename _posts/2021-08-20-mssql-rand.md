---
layout: post
title: MSSQL RAND 함수로 난수 생성하기
subtitle: generating random numbers
# cover-img: /assets/img/cover3.jpg
thumbnail-img: ''
comments: true
tags: [MSSQL, Function]
last-updated: 2021-08-20sql
---

## **정수형 난수**

### 최대값와 최소값을 포함할 때

```sql
@max -- 최대값
@min -- 최소값
```

```sql
SELECT CONVERT(INT, ((@max + 1) - @min) * RAND()  + @min)
```

또는

```sql
SELECT CAST(((@max + 1) - @min) * RAND()  + @min AS INT)
```

<br/>
<br/>

### 최대값을 포함하지 않고 최소값을 포함할 때

```sql
SELECT CONVERT(INT, (@max  - @min) * RAND()  + @min)
```

또는

```sql
SELECT CAST((@max  - @min) * RAND()  + @min AS INT)
```

<br/>
<br/>

### 최대값을 포함하지 않고 최소값을 포함하지 않을 때

```sql
SELECT CONVERT(INT, (@max - (@min + 1)) * RAND()  + (@min + 1))
```

또는

```sql
SELECT CAST((@max - (@min + 1)) * RAND()  + (@min + 1) AS INT)
```

<br/>
<br/>

## **실수형 난수**

### 최대값와 최소값을 포함할 때

```sql
@max -- 최대값
@min -- 최소값
@roundnum -- 반올림 자릿수
```

```sql
SELECT ROUND((@max - @min) * RAND() + @min, @roundnum)
```

<br/>
<br/>

### 최대값을 포함하지 않고 최소값을 포함할 때

```sql
SELECT ROUND((((@max - (1.0 / POWER(10.0, roundnum))) )- @min) * RAND() + @min, @roundnum)
```

<br/>

```sql
1.0 / POWER(10.0, roundnum)
```

최대값에서 이렇게 빼주는 이유는 최대값 바로 전 실수가 소수점 아래 수 @roundnum가

-   2일 때 @max - 0.01
-   3일 때 @max - 0.001

이렇게 되기 때문입니다.
<br/>
<br/>

### 최대값을 포함하지 않고 최소값을 포함하지 않을 때

```sql
SELECT ROUND((((@max - (1.0 / POWER(10.0, roundnum)))
            - (@min + (1.0 / POWER(10.0, roundnum))))
            * RAND() + (@min + (1.0 / POWER(10.0, roundnum)))
        , @roundnum)
```

<br/>

저는 정수형 난수도 자주쓰고 실수형 난수도 자주 쓰고있는데요.<br/>
정수는 물건의 개수, 아이템의 개수 등에 쓰이고 실수는 확률 계산할 때 많이 쓰고있어요.😁<br/>
더 좋은 방법이나 오류가 있을땐 피드백 남겨주세요 감사합니다!
