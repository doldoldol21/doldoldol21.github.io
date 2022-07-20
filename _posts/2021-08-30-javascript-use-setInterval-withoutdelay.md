---
layout: post
title: Javascript setInterval 에서 선딜레이를 뺀 setTimeout 활용법!
subtitle: about setInterval first delay
# cover-img: /assets/img/cover4.jpg
thumbnail-img: ""
comments: true
tags: [Javascript, Function, SetInterval]
last-updated: 2021-08-30
---

### 안녕하세요 !

javascript 코드에서 가끔 카운트다운처럼 반복적인 함수나 딜레이가 필요한 작업에서 우리는 ***setInterval*** 그리고 ***setTimeout*** 함수를 많이 이용하고 있는데요.

<br/>

먼저 setTimeout의 사용입니다.
```javascript
function plusOne(num){	
    console.log(num);
	
    setTimeout(function(){
        num += 1;
        console.log(num);
    }, 1000)
	
    console.log(num);
}
plusOne(1);
```

결과: 

```javascript
1
1
2
```

함수 plusOne 안에 setTimeout을 

1초뒤에 num변수에 1을 더한 뒤 로그를 찍도록 정의하였는데요.

<br/>

작동 순서는 plusOne 함수안에서 setTimeout 함수를 만난 뒤,

딜레이만큼 기다렸다가, setTimeout함수 안에 정의 된 코드를 호출하게 됩니다.

첫번째 줄에 console.log() 출력은 1, 두번째 출력인 console.log()는 1000ms 뒤에 실행하므로 가장 끝부분에 있는 console.log() 부터 먼저 실행되게됩니다.

그리고 마지막으로 num변수에 1을 더한 2가 출력되게됩니다.

<br/>

다음으로 setInterval의 사용에 대해 볼게요.
```javascript
function plusOne(num){
	console.log(num);
	
	var foo = setInterval(function(){
		num++;
		console.log(num);
		if(num >= 5){
			clearInterval(foo);
		}
	}, 1000);

	foo;
}
plusOne(1);
```

결과:
```javascript
1
2
3
4
5
```

여기서 봐야할 건 foo에 정의된 setInterval 함수입니다.

plusOne 함수안에서 1초마다 반복적으로 실행하는 setInterval 함수를 foo변수에다가 정의하고 호출했어요.

포스트의 주제와는 관련없지만, 위 setTimeout 함수와의 차이점은 바로 setInterval 함수는 변수에다가 담아서 써야한다는 거에요.

만약 변수에 담지 않고 쓴다면,
```javascript
setInterval(function(){
    num++;
    console.log(num);
    if(num >= 5){
        console.log('help me');
        // return, clearInterval() 등 
        // 멈출 수 없다.
    }
}, 1000);
```

멈출 수가 없습니다..😫

그래서 setInterval은 항상 변수에 담아서 써야해요!

<br/>

자 이제 이번 포스트의 메인 주제인 setInterval 선딜레이 없이 쓰기인데요


주제를 이렇게 정한 이유는 setInterval을 사용할때 *만약 숫자 1을 반복적으로 출력하는 코드* 라면
```javascript
// 1000ms
1
// 1000ms
1
// 1000ms
1
// 1000ms
.
.
```
이런식으로 첫 출력(1)이 찍히기 전, 선 딜레이가 먼저 생긴다음 안에 코드를 실행하게됩니다.

함수를 선 딜레이 없이 쓰기위해 이 포스트를 작성했는데요.

이미 알고 계신 분도 있고, 더 좋은 방법으로 쓰고 계신분도 있으실거에요.

다음은 제가 사용하는 방법이에요.

```javascript
function numPlus(num){
	
	num++;
	console.log(num);
		
	if(num >= 5){
		return;
	}
	
	setTimeout(numPlus, 1000, (num)) ;
}

numPlus(1);
```

위의 setInterval 코드와 같이 숫자를 넣어 1씩 더하는 함수를 정의했는데요.

다른 점이 있다면 setTimeout으로 재귀함수처럼 호출했다는 거에요.

<br/>

이렇게 했을 때의 장점은
```javascript
2
// 1000ms
3
// 1000ms
4
// 1000ms
5
```

첫 출력인 2가 출력되기 전에 딜레이가 없다는건데요.

numPlus 안에 정의된 코드들을 한번은 무조건 실행한 다음 자기 자신을 호출하기 때문이에요.

그리고 또 다른 장점은 변수에 담지 않고도 return 만으로도 멈출 수가 있다는 거에요.🤗

<br/>


생각보다 앞으로 쓸 일이 많을 것 같아서 포스트로 작성했어요.

혹시 포스트안에 오류나 피드백이 있으시다면, 댓글 혹은 이메일로 피드백 주시면 너무너무 감사하겠습니다.
