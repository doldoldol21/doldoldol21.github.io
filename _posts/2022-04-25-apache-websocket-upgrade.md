---
layout: post
title: Apache linux websocket header upgrade
subtitle: openvidu 배포하면서 생긴 문제
# cover-img: /assets/img/cover6.jpg
thumbnail-img: ""
comments: true
tags: [Apache, Header, Websocket, Openvidu, 기록]
last-updated: 2022-04-25
---

openvidu를 서버에 배포하다 만난 에러로 이것저것 알아보다가 나중을 위해 기록해둡니다.

### Apache

에서 websocekt 쓸 때 헤더 업그레이드 관련 에러가 날 때 설정해줄 수 있는 옵션이에요.

제 경우는 ubuntu 서버였고 443 포트로 들어오는 요청을 소켓서버로 프록시를 이용해 전달해 주는 상황이었어요.

다음 커맨드로 proxy와 ssl 모두 켜져있고 SSL keyfile 설정도 모두 되어있다는 가정입니다.

```linux
a2enmod proxy
a2enmod ssl
```

```apache
<VirtualHost *:443>


    SSLEngine on
    ServerName example.site.com

    SSLCertificateFile /etc/letsencrypt/live/[도메인주소]/cert.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/[도메인주소]/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/[도메인주소]/chain.pem


    ProxyPreserveHost On
    ProxyRequests Off

    RewriteEngine On
    RequestHeader set X-Forwarded-Proto "https"
    RewriteCond %{REQUEST_URI} ^/api/v3/websocket [NC,OR]
    RewriteCond %{HTTP:UPGRADE} ^WebSocket$ [NC,OR]
    RewriteCond %{HTTP:CONNECTION} ^Upgrade$ [NC]
    RewriteRule .* ws://127.0.0.1:5443%{REQUEST_URI} [P,QSA,L]
    RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} !-f
    RewriteRule .* http://127.0.0.1:5443%{REQUEST_URI} [P,QSA,L]

    <Location />
            Require all granted
            ProxyPass http://127.0.0.1:5443/
            ProxyPassReverse  http://127.0.0.1:5443/
            ProxyPassReverseCookieDomain 127.0.0.1 example.site.com
    </Location>


</VirtualHost>

```

포트만 바꿔 사용하시면 될 것 같습니다.✨

<br/>
<br/>

추가로

### Nginx

에서 헤더에 웹소켓 업그레이드를 추가하는 방법이에요.

location / {} 안에 부분만 중점으로 보시면 될 거 같아요.

```nginx

server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/[도메인주소]/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/[도메인주소]/privkey.pem;

    # Disable SSL
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

    # 통신과정에서 사용할 암호화 알고리즘
    # Encryption algorithm to be used in the communication process
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;

    # Enable HSTS
    # 클라이언트에게 http로 어떠한 것도 로드 하지 말라고 규제합니다.
    # 이를 통해 http에서 https로의 호출을 최소화 할 수 있습니다.
    # Regulates clients not to load anything with http.
    # This allows you to minimize http to https calls.

    add_header Strict-Transport-Security "max-age=31536000" always;

    # SSL sessions
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    location / {
      proxy_pass http://app;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_set_header Host $host;
    }
  }

```
