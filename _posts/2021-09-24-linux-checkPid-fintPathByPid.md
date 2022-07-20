---
layout: post
title: Linux 실행중인 프로그램 PID확인 및 PID로 파일 위치찾기
subtitle: Linux check PID and find path by PID
# cover-img: /assets/img/cover6.jpg
thumbnail-img: ""
comments: true
tags: [Linux, PID, 기록]
last-updated: 2021-10-06
---

<br>

### netstat으로 현재 실행 중인 프로그램 확인

<br>

netstat 을 사용하면 현재 열려있는 포트와 PID, 프로그램 이름을 확인할 수 있습니다.

```console
# netstat -tulpn

Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN      707/vsftpd
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1016/sshd
tcp        0      0 0.0.0.0:3001            0.0.0.0:*               LISTEN      17185/index.js
tcp        0      0 0.0.0.0:25              0.0.0.0:*               LISTEN      1269/master
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      4741/nginx.conf
tcp        0      0 0.0.0.0:6379            0.0.0.0:*               LISTEN      1289/redis-server *
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      4741/nginx.conf
tcp6       0      0 :::22                   :::*                    LISTEN      1016/sshd
tcp6       0      0 :::3000                 :::*                    LISTEN      17185/index.js
tcp6       0      0 :::25                   :::*                    LISTEN      1269/master
tcp6       0      0 :::6379                 :::*                    LISTEN      1289/redis-server *

```

<br>

특정 포트나 특정 PID를 확인하고 싶다면

```console
netstat -tulpn | grep 숫자
```

<br>

```console
포트로 찾기
# netstat -tulpn | grep 3001

tcp        0      0 0.0.0.0:3001            0.0.0.0:*               LISTEN      17185/index.js

PID로 찾기
# netstat -tulpn | grep 17185

tcp        0      0 0.0.0.0:3001            0.0.0.0:*               LISTEN      17185/index.js
tcp6       0      0 :::3000                 :::*                    LISTEN      17185/index.js

```

<br>

### netstat 옵션중 예제에서 쓰인 -tulpn 의 설명

-t, --tcp : **_listening 중인 TCP 소켓만 표시합니다_**

-u, --udp : **_listening 중인 UDP 소켓만 표시합니다_**

-l, --listening : **_연결 대기 상태인 소켓만 표시_**

-p, --programs : **_소켓을 사용하고 있는 프로세스의 ID 표시_**

-n, --numeric : **_호스트, 포트 번호 등의 이름 확인을 하지 않고 숫자로 표시_**

<br>

더 자세한 옵션을 알고 싶으시다면 netstat --help 로 알아보시거나 아래의 사이트에서 자세하게 번역되어있으니 참고 하시면 좋겠네요😀

<https://www.lesstif.com/lpt/linux-netstat-93127510.html>

<br>

### PID로 실행 중인 파일의 위치(path) 찾기

<br>

```console
ll /proc/<PID>/exe
```

```console
ll /proc/17185/exe

lrwxrwxrwx 1 root root 0 Sep 24 11:38 /proc/17185/exe -> /usr/local/bin/node*
```

<br>

### 파일 이름으로 파일의 위치(path) 찾기

<br>

```console
ps -ef | grep 이름

또는

find / -name 이름
```

```console
tomcat의 위치 찾기

ps -ef | grep tomcat

find / -name tomcat
```

감사합니다😍
