---
layout: post
title: C 연습 진법 변환 (재귀 함수)
subtitle: C Practice base conversion
# cover-img: /assets/img/cover6.jpg
thumbnail-img: ""
comments: true
tags: [C, 연습, 기록]
last-updated: 2022-01-27
---

재귀 함수를 통한 진법 변환 코드를 만들어봤어요.<br/>

```c
// 10진수로 바꿔주는 함수
int change_to_decimal(char arr[], int base)

// 진법을 변환시켜주는 재귀함수
void base_conversion(int num, int base)

```

두 함수만 눈 여겨 보시면 될거같아요.<br/><br/>

코드:

```c

#include <stdio.h>


int main()
{
    void base_conversion(int num, int base);
    int change_to_decimal(char arr[], int base);
    int check_base(int base);




    // base: 입력 숫자의 진법, target: 변환할 진법
    int base, target;
    int result_change_deciaml;

    // 변환할 숫자
    char arr[100];

    printf("변환할 숫자: ");
    scanf("%s", arr);

    printf("입력한 숫자의 진법 (2, 4, 8, 10, 16, 32) : ");
    scanf("%d", &base);

    if(!check_base(base)){
        printf("%d: 허용되지 않는 진법입니다.\n", base);
        return 0;
    }

    printf("바꿀 진법 (2, 4, 8, 10, 16, 32): ");
    scanf("%d", &target);

    if(!check_base(target)){
        printf("%d: 허용되지 않는 진법입니다.\n", target);
        return 0;
    }


    // 배열 개수 (반복문 돌기위해)
    int len = sizeof(arr) / sizeof(arr[0]);

    // 입력 받은 수 10진법 변환
    result_change_deciaml = change_to_decimal(arr, base);
    if(result_change_deciaml < 0){
        return 0;
    }

    // base_conversion (변환할 숫자, 진법)
    base_conversion(result_change_deciaml, target);

    printf("\n");

    return 0;
}

void print_num(int num){
    if(num < 10){
        printf("%d", num);
        return;
    }
    char c = (char)(num + 55);
    printf("%c", c);
}

// 재귀 함수를 통한 진법 변환 (num 은 항상 10진수의 수)
void base_conversion(int num, int target){

    if(num < target){
        print_num(num);
        return;
    }

    base_conversion(num / target, target);
    print_num(num % target);
}

int change_to_decimal(char arr[], int base){
    int getsize(char arr[]);

    // getsize() 문자열의 길이를 받아오는데 공백 자리는 빠진다.
    int len = getsize(arr);
    int sum = 0;
    int k = 0;
    int m;
    int j;

    //printf("%d\n", len);

    // 제일 뒤에서 부터
    // 1010
    // <-
    for(int i = (len - 1); i >= 0; i--){
        k = (int)arr[i];

        //printf("k::: %d(%c)\n", k, arr[i]);

        // 아스키코드 48 ~ 57 => 0 ~ 9
        if(k > 47 && k < 58){
            k -= 48;
        }else if(k > 96 && k < 123){
            // 소문자 체크
            k -= 87;
        }else if (k > 64 && k < 91){
            k -= 55;
        }else {
            printf("%c: 허용되지 않는 입력값입니다.\n", arr[i]);
            return -1;
        }

        if(k == 0){
            continue;
        }

        // 제일 첫 번째 배열이면 무조건 x1
        if(i == len - 1){
            m = 1;
        }else{
            j = len - 2;
            m = base;
            while(j > i){
                m *= base;
                j--;
            }
        }

        k *= m;
        //printf("k: %d, m: %d\n", k, m);
        sum += k;
    }

    //printf("sum: %d\n", sum);

    return sum;
}

int getsize(char arr[]){
    int i = 0;
    while(1){
        if(arr[i] == '\0'){
            break;
        }
        i++;
    }
    return i;
}

int check_base(int base){
    if(base == 2 || base == 4 || base == 8
    || base == 10 || base == 16 || base == 32){
        return 1;
    }
    return 0;
}

```

결과:

```
변환할 숫자: 255
입력한 숫자의 진법 (2, 4, 8, 10, 16, 32) : 10
바꿀 진법 (2, 4, 8, 10, 16, 32): 16
FF
```

```
변환할 숫자: 10010011
입력한 숫자의 진법 (2, 4, 8, 10, 16, 32) : 2
바꿀 진법 (2, 4, 8, 10, 16, 32): 10
147
```
