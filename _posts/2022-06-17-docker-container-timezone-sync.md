---
layout: post
title: Docker container 시간 안맞을 때 타임존 맞추기
subtitle: Docker container set timezone
# cover-img: /assets/img/cover6.jpg
thumbnail-img: ""
comments: true
tags: [Docker, Docker container, 기록]
last-updated: 2022-06-17
---

## Docker Container Timezone Sync

도커 컨테이너 서버 시간이 맞지 않을 때 동기화 시키는 방법입니다.

테스트 환경

-   Windows 10
-   Docker Desktop
-   Mysql container(ubuntu)

<br>

```console
docker exec -it [my_container] /bin/bash
```

도커 컨테이너 서버로 접속 하신 후 커맨드 창에 다음 명령어를 입력합니다.

```console
dpkg-reconfigure tzdata
```

<br>

```console
root@5ab17afdd7a2:/# dpkg-reconfigure tzdata
debconf: unable to initialize frontend: Dialog
debconf: (No usable dialog-like program is installed, so the dialog based frontend cannot be used. at /usr/share/perl5/Debconf/FrontEnd/Dialog.pm line 78.)
debconf: falling back to frontend: Readline
Configuring tzdata
------------------

Please select the geographic area in which you live. Subsequent configuration questions will narrow this down by
presenting a list of cities, representing the time zones in which they are located.

  1. Africa   3. Antarctica  5. Arctic  7. Atlantic  9. Indian    11. SystemV  13. Etc
  2. America  4. Australia   6. Asia    8. Europe    10. Pacific  12. US
Geographic area: 6

Please select the city or region corresponding to your time zone.

  1. Aden      16. Brunei       31. Hong_Kong    46. Kuala_Lumpur  61. Pyongyang      76. Tehran
  2. Almaty    17. Chita        32. Hovd         47. Kuching       62. Qatar          77. Tel_Aviv
  3. Amman     18. Choibalsan   33. Irkutsk      48. Kuwait        63. Qostanay       78. Thimphu
  4. Anadyr    19. Chongqing    34. Istanbul     49. Macau         64. Qyzylorda      79. Tokyo
  5. Aqtau     20. Colombo      35. Jakarta      50. Magadan       65. Rangoon        80. Tomsk
  6. Aqtobe    21. Damascus     36. Jayapura     51. Makassar      66. Riyadh         81. Ujung_Pandang
  7. Ashgabat  22. Dhaka        37. Jerusalem    52. Manila        67. Sakhalin       82. Ulaanbaatar
  8. Atyrau    23. Dili         38. Kabul        53. Muscat        68. Samarkand      83. Urumqi
  9. Baghdad   24. Dubai        39. Kamchatka    54. Nicosia       69. Seoul          84. Ust-Nera
  10. Bahrain  25. Dushanbe     40. Karachi      55. Novokuznetsk  70. Shanghai       85. Vientiane
  11. Baku     26. Famagusta    41. Kashgar      56. Novosibirsk   71. Singapore      86. Vladivostok
  12. Bangkok  27. Gaza         42. Kathmandu    57. Omsk          72. Srednekolymsk  87. Yakutsk
  13. Barnaul  28. Harbin       43. Khandyga     58. Oral          73. Taipei         88. Yangon
  14. Beirut   29. Hebron       44. Kolkata      59. Phnom_Penh    74. Tashkent       89. Yekaterinburg
  15. Bishkek  30. Ho_Chi_Minh  45. Krasnoyarsk  60. Pontianak     75. Tbilisi        90. Yerevan
Time zone: 69


Current default time zone: 'Asia/Seoul'
Local time is now:      Fri Jun 17 16:37:24 KST 2022.
Universal Time is now:  Fri Jun 17 07:37:24 UTC 2022.
```

타임 존을 선택하고 `date` 명령어로 확인합니다.
<br>

```console
root@5ab17afdd7a2:/# date
Fri Jun 17 16:37:25 KST 2022
```

👍
