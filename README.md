# J109 : Clone Airbnb

배포 링크 : https://j109.herokuapp.com/

## 🗂 디렉토리 구조
```
/.github : 템플릿이 담겨 있는 폴더
/server
|ㅡㅡ /bin
|ㅡㅡ /database
|ㅡㅡ /models
|ㅡㅡ /router
|ㅡㅡ /views
     |ㅡㅡ /css
     |ㅡㅡ /js
     |ㅡㅡ /static
     `ㅡㅡ some pug files...
|ㅡㅡ app.js
|ㅡㅡ package.json
`ㅡㅡ package-lock.json
```

## 프로젝트 관련
> [Wiki ✨](https://github.com/sbyeol3/javascript-w1-airbnb/wiki)

### 진행상황

- 로그인/로그아웃 기능 구현 (POST /login, GET /logout)
- 회원가입 기능 구현 (POST /register)
- 회원가입 시 입력값의 유효성 체크 및 모두 유효한 경우 POST 요청하게 기능 추가
- NeDB를 활용하여 세션 테이블 생성 (age : 30분)
- `cypto-js` 모듈로 패스워드 암호화
- 검색 시 달력, 게스트 구현
- 검색 기능 구현 (필수 값 : 위치)
- 예약 기능 구현 (위치, 체크인, 체크아웃, 게스트 모두 있어야 활성화)
- 결과 데이터가 0개인 경우에 대한 뷰 생성