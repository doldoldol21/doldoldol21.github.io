---
layout: post
title: Kubeadm etcdctl 확인
subtitle: etcdctl check in kubeadm
# cover-img: /assets/img/cover6.jpg
thumbnail-img: ""
comments: true
tags: [Kubernetes, 기록]
last-updated: 2023-08-23
---

### kubeadm 설치 이후 
`kubectl -n kube-system get pod`

```shell
rocky@2-rocky ~ » kubectl -n kube-system get pod

NAME                              READY   STATUS    RESTARTS   AGE
coredns-5dd5756b68-9j4tp          1/1     Running   0          109m
coredns-5dd5756b68-qb8z8          1/1     Running   0          109m
etcd-2-rocky                      1/1     Running   6          109m
kube-apiserver-2-rocky            1/1     Running   6          109m
kube-controller-manager-2-rocky   1/1     Running   3          109m
kube-proxy-xd5c8                  1/1     Running   0          109m
kube-scheduler-2-rocky            1/1     Running   6          109m
```

### etcd-{마스터 호스트 이름} 파드로 접속
`kubectl -n kube-system exec -it etcd-2-rocky sh`
```shell
rocky@2-rocky ~ » kubectl -n kube-system exec -it etcd-2-rocky -- sh
sh-5.1# 
```

### etcdctl 환경 변수 설정
* API 버전을 지정합니다. (기본값: 3) <br> `export ETCDCTL_API=3`
* 연결할 etcd 엔드포인트 목록을 지정합니다.<br>`export ETCDCTL_ENDPOINTS=127.0.0.1:2379`
* TLS 인증을 사용할 경우 인증서와 키 파일 경로를 지정합니다.<br>
`export ETCDCTL_CACERT=/etc/kubernetes/pki/etcd/ca.crt`<br>
`export ETCDCTL_CERT=/etc/kubernetes/pki/etcd/server.crt`<br>
`export ETCDCTL_KEY=/etc/kubernetes/pki/etcd/server.key`<br>

환경 변수를 저장하는 이유는 이후에 kubeadm의 etcdctl을 사용할 때 엔드포인트 또는 인증정보를 인자값으로 넣어주는 번거로움을 덜기 위해서입니다.

### 테스트
키값이 "/"로 시작하는 모든 데이터들의 키값만 출력

`etcdctl get --prefix / --keys-only`

```shell
sh-5.1# etcdctl get --prefix / --keys-only
/registry/apiregistration.k8s.io/apiservices/v1.
/registry/apiregistration.k8s.io/apiservices/v1.admissionregistration.k8s.io
/registry/apiregistration.k8s.io/apiservices/v1.apiextensions.k8s.io
/registry/apiregistration.k8s.io/apiservices/v1.apps

.
.
.


```
감사합니다 👍
