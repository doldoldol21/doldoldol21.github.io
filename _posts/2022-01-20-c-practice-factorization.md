---
layout: post
title: C 연습 소인수 분해 함수
subtitle: C Practice prime factorization function
# cover-img: /assets/img/cover6.jpg
thumbnail-img: ""
comments: true
tags: [C, 연습, 기록]
last-updated: 2022-01-27
---

저는 요새 틈틈히 C 언어를 배우고 있어요.<br/>
[모두의 코드](https://modoocode.com){:target="\_blank"}<br/>
여기 선생님꺼 보고 배우는 중인데 글로도 쏙쏙 들어오게 잘 설명해 주셨어요!

다음은 제가 함수부분을 배워서 정리한 소인수 분해 함수입니다😀

```c

#include <stdio.h>
#include <math.h>

// 소수 판별 함수
int isPrime(int n)
{
    for (int i = 2; i < n; i++)
    {
        if (n % i == 0)
        {
            return 0;
        }
    }

    return 1;
}

// 소인수 분해 함수
// ex) input: 7, output: 소수입니다.
// ex) input: 12, output: 2 X 2 X 3
void print_factorization(int n)
{
    if (isPrime(n) == 1)
    {
        printf("%d: 소수입니다.\n", n);
        return;
    }
    if (n < 0)
    {
        printf("%d", -1);
        printf(" X ");
        n *= -1;
    }

    int i = 2;

    while (n > 1)
    {
        if (n % i == 0)
        {
            printf("%d", i);
            if (isPrime(n) == 0)
            {
                printf(" X ");
            }
            n /= i;
            i = 1;
        }

        i++;
    }
    printf("\n");
}

int main()
{

    print_factorization(4);
    print_factorization(2);
    print_factorization(3);
    print_factorization(20);
    print_factorization(45);
    print_factorization(180);

    return 0;
}
```

결과:

```
2 X 2
2: 소수입니다.
3: 소수입니다.
2 X 2 X 5
3 X 3 X 5
2 X 2 X 3 X 3 X 5
```
