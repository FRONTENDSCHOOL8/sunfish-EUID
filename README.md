# 시작하기
``` npm i vite ```를 설치하시고 ```npm run dev```를 해주세요

# 추가사항

tailwind.css에서 아래 사진과 다르게 오류가 난다면 다음과 같이 진행해주세요

<img width="167" alt="스크린샷 2024-01-01 19 43 13" src="https://github.com/FRONTENDSCHOOL8/sunfish-EUID/assets/113508075/1555e7d2-0218-408b-a00b-a125f90f6b84">

<br/>
<br/>


1. .vscode 폴더를 생성해주세요
2. 다음으로 setting.json 파일을 생성하고, 밑의 코드를 복붙해주시면 오류 해결완료!!🫡
```{
  "css.validate": false,
  "tailwindCSS.emmetCompletions": true,
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
    "strings": "on"
  },
  "tailwindCSS.includeLanguages": {
    "plaintext": "html"
  }
}
```
