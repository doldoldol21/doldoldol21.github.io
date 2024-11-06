---
layout: post
title: Windows에서 WSL과 Oh My Zsh 설치 및 테마 설정하기
subtitle: Windows에서 리눅스 스타일의 터미널 환경 구성하기
thumbnail-img: ""
comments: true
tags: [Windows, WSL, Oh My Zsh, 터미널]
last-updated: 2024-11-06
---

### Windows에서 WSL과 Oh My Zsh 설치하기
개발자에게 편리한 터미널 환경은 작업 효율성을 크게 높여줍니다. 이번 포스트에서는 Windows 환경에서 WSL을 설치하고, Oh My Zsh를 통해 테마 및 플러그인을 설정하는 방법을 다루겠습니다.

---

#### 1. WSL (Windows Subsystem for Linux) 설치
Windows에서 WSL을 통해 리눅스 환경을 설정할 수 있습니다. WSL 설치 후 Ubuntu와 같은 리눅스 배포판을 사용해 Oh My Zsh 및 다양한 개발 도구를 활용할 수 있습니다.

1. **WSL 활성화**: Windows 키를 누르고 "PowerShell"을 검색한 후, **관리자 권한으로 PowerShell 실행**을 선택합니다. 그런 다음, WSL을 활성화하는 명령을 입력하세요.
   ```powershell
   wsl --install
   ```
   이 명령어는 WSL을 설치하고, 기본 리눅스 배포판인 Ubuntu를 자동으로 설치합니다. 설치가 완료되면 **시스템을 재부팅**합니다.

2. **Ubuntu 실행 및 초기 설정**: 재부팅 후, 시작 메뉴에서 Ubuntu를 실행하면 사용자 이름과 비밀번호를 설정하라는 초기 설정 화면이 나타납니다. 이 설정을 완료하면 Ubuntu 환경이 준비됩니다.

> **참고**: Ubuntu 외의 리눅스 배포판을 사용하고 싶다면, [Microsoft Store](https://aka.ms/wslstore)에서 다른 배포판을 검색하여 설치할 수 있습니다.

#### 2. Zsh 및 Oh My Zsh 설치
Ubuntu에서 Zsh를 설치하고 Oh My Zsh를 통해 커스터마이징할 수 있습니다.

1. **Zsh 설치**:
   ```bash
   sudo apt update
   sudo apt install zsh -y
   chsh -s $(which zsh)
   ```

2. **Oh My Zsh 설치**:
   ```bash
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

   설치가 완료되면 기본 Zsh 테마와 플러그인이 포함된 `.zshrc` 파일이 생성됩니다.

#### 3. Oh My Zsh 테마 설정
Oh My Zsh는 다양한 테마를 제공하며, 대표적으로 `agnoster` 테마가 많이 사용됩니다.

1. **테마 변경**: `~/.zshrc` 파일을 열어 `ZSH_THEME` 항목을 `"agnoster"`로 설정합니다.
   ```zsh
   ZSH_THEME="agnoster"
   ```
2. **설정 적용**: 변경 사항을 적용하려면 아래 명령어를 입력합니다.
   ```bash
   source ~/.zshrc
   ```

#### 4. 유용한 Oh My Zsh 플러그인 설정
Oh My Zsh는 자동 완성과 명령어 하이라이트 등 다양한 기능을 제공하는 플러그인을 지원합니다. 다음은 개발자들에게 유용한 플러그인입니다.

- **zsh-autosuggestions**: 이전에 입력한 명령어를 자동으로 추천해 주며, 빠른 명령어 입력을 돕습니다.
  ```bash
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
  ```

- **zsh-syntax-highlighting**: 명령어 구문을 색상으로 하이라이트해 주어, 입력 오류를 쉽게 식별할 수 있습니다.
  ```bash
  git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
  ```

- **zsh-completions**: Docker, AWS CLI 등 다양한 툴의 자동 완성 기능을 강화해 줍니다.
  ```bash
  git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-completions
  ```

- **autojump**: 자주 사용하던 디렉터리로 빠르게 이동할 수 있게 해 주어 편리합니다.
  ```bash
  sudo apt install autojump -y
  ```

플러그인을 설치한 후, `~/.zshrc` 파일의 `plugins` 섹션에 플러그인 이름을 추가합니다:

```zsh
plugins=(git zsh-autosuggestions zsh-syntax-highlighting zsh-completions autojump)
```

변경 사항을 적용하려면 아래 명령어를 입력합니다:

```bash
source ~/.zshrc
```

#### 5. Windows Terminal 색상 스킴 설정 및 적용
`agnoster` 테마를 적용한 후, Windows Terminal에서 터미널 색상을 조정해 더 높은 가시성과 감성적인 분위기를 연출할 수 있습니다.

1. **색상 스킴 추가**: 아래의 예제 색상 스킴을 Windows Terminal 설정 파일에 추가합니다.

   **예제 테마**: 부드러운 색감을 가진 `Aesthetic Dark` 테마입니다.

   ```json
   {
       "background": "#1B1B2F",
       "black": "#1B1B2F",
       "blue": "#4A90E2",
       "brightBlack": "#3E3E55",
       "brightBlue": "#6FA9FF",
       "brightCyan": "#50C5B7",
       "brightGreen": "#80C990",
       "brightPurple": "#B488FF",
       "brightRed": "#F28B82",
       "brightWhite": "#E4E4E6",
       "brightYellow": "#FFD97A",
       "cursorColor": "#AAB2C0",
       "cyan": "#4DD0E1",
       "foreground": "#E4E4E6",
       "green": "#6BE674",
       "name": "Aesthetic Dark",
       "purple": "#A685E2",
       "red": "#FF6B6B",
       "selectionBackground": "#2C2C44",
       "white": "#E4E4E6",
       "yellow": "#FFD54F"
   }
   ```

2. **색상 스킴 적용**: Windows Terminal 설정 파일에서 Ubuntu 프로필의 `"colorScheme"` 항목을 `"Aesthetic Dark"`로 설정합니다.

   ```json
   {
       "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
       "name": "Ubuntu",
       "source": "Windows.Terminal.Wsl",
       "startingDirectory": "%USERPROFILE%",
       "colorScheme": "Aesthetic Dark"
   }
   ```

이제 Windows Terminal에서 Ubuntu 프로필을 열 때 감성적이고 가시성이 좋은 테마가 적용됩니다.

### 요약 및 결론
Windows에서 WSL과 Oh My Zsh를 설치한 후 플러그인과 색상 스킴을 설정하여 개발자 친화적인 터미널 환경을 구성할 수 있습니다. 이 설정은 작업의 가시성을 높이고, 리눅스 스타일의 편리한 터미널 경험을 제공합니다. 더 다양한 테마와 플러그인을 시도하여 자신만의 최적화된 환경을 구성해 보세요.

감사합니다! 👍

