# Project NaiClover ver 1.2
개발기간: 1월 15일 ~ 2월 6일 (3주)

<img src="https://github.com/JHSasdf/NaiClover/assets/146299597/548b3c3a-8e12-4792-9427-41a65253d145" widht="400" height="350" />

## 배포 주소
http://3.34.47.72/

**Manual**
*sign up can be possible
|type|id|pw|
|----|--|------|
|guest|aaaa|111111|
|guest|bbbb|111111|
|guest|cccc|111111|
|guest|dddd|111111|


## DB 구조도
![image](https://github.com/JHSasdf/NaiClover/assets/146299597/67df4336-e94b-41f4-bdce-4f78747005be)

## 화면 흐름도
![image](https://github.com/JHSasdf/NaiClover/assets/146299597/5bf549dd-ea63-4d6f-8918-6d6961c66fea)


## API Address
[https://www.notion.so/naiClover-API-9394d7d1d1564d92a78fe17d050ca4aa?pvs=4](https://checker-mantis-1cc.notion.site/naiClover-API-9394d7d1d1564d92a78fe17d050ca4aa)

## 주요 기능
* 회원가입 기능
  
 ![naicloversignup](https://github.com/JHSasdf/NaiClover/assets/146299597/f50bb4c2-4868-446b-91db-05dece5c068b)
* post CRUD 기능, 댓글, 좋아요 토글 기능
  
![naiclovercreatepost](https://github.com/JHSasdf/NaiClover/assets/146299597/7bcab441-15cb-44c9-bb4c-59bbe301bd55)
* post 검색 기능

![NaiClova-query](https://github.com/JHSasdf/NaiClover/assets/146299597/38580aec-7c7a-424e-9109-5a916dd039ec)

* follow 한 유저의 post를 top으로 올리는 기능
* 1:1 채팅 기능
  
![naiclover-userinfo-personalcaht](https://github.com/JHSasdf/NaiClover/assets/146299597/6565d9e9-5d20-461a-a0d6-2f9cbf1499cf)


* 모노채팅 기능, korean, english로 언어 제한, 채팅 확인 인원 체크 기능

![naiclovermonochatroom](https://github.com/JHSasdf/NaiClover/assets/146299597/fe8a2b1e-3755-47dc-b94f-487175000b2b)
![naiclover-monochat](https://github.com/JHSasdf/NaiClover/assets/146299597/743fe5ec-7eab-443f-a2b2-0586f36aa13f)


* 현재 참여하고 있는 인원 체크 기능
  
![nai-clover-currentnopim](https://github.com/JHSasdf/NaiClover/assets/146299597/f0710f81-86cd-4cd1-bd18-a404d47acd55)

* 맞춤법 수정 기능과 수정된 로그들을 볼 수 있는 페이지
  
![naiclovererrorlog](https://github.com/JHSasdf/NaiClover/assets/146299597/43b9a39c-b381-44c4-8c45-72e3aac37a53)
* 채팅 autoFetch기능
  
![naicloverautofetch](https://github.com/JHSasdf/NaiClover/assets/146299597/766c685a-4585-413a-bd1c-8db70f94236b)


## 개발팀 소개
|이름|담당|역할|
|------|-----|--------|
|김재현|프론트엔드|마이페이지, searchUser페이지, 채팅 프론트, footer, 채팅 페이지 자동 스크롤 로직|
|이시윤|프론트엔드|Post페이지, post작성, post삭제, 댓글추가, post 검색 기능|
|한우리|풀스택|팔로우 기능 백엔드, 알림 기능, sequelize 틀 구축, correcting page 프론트 백, ErrorLog페이지 프론트, 백엔드|
|윤정훈|풀스택|채팅 로직 구현, 모노챗 언어 제한 기능, 팔로잉, 팔로워 인원 로직 구현|
|선지훈|풀스택|회원가입 풀스택, 로그인 풀스택, 마이페이지 백엔드 구축, searchUser페이지 백엔드, post페이지 백엔드 구축, 개인챗, 모노챗 백엔드, 프론트 백 bug fix, 404, 500 등 오류페이지 프론트 페이지 백엔드 구축, 서버구축, 배포|


![image](https://github.com/JHSasdf/NaiClover/assets/146299597/bda78799-4bb6-45f8-93bf-f47d0955b638)

## 프로젝트 소개
This project is for someone who wants to improve language skills.
giving them to place to ask their question to native speaker, Users can solve their questions about language they are learining,
and can learn other country's culture by interacting by using post page.
Besides, Users can chat each other by using chat page, and can practice language by restricting other languages.

our website will give you those following component. 
1. Language and culture posting page (in culture page, you can upload pictures)
2. Following feature that makes you watch followers post first
3. chatting feature with one people
4. chatting feature with many people

## 시작 가이드
**REQUIREMENTS**
For building and running the application you need:
* Node.js 20.9.0 or lower
* npm 10.1.0

* **Installation**
```
$ git clone https://github.com/JHSasdf/NaiClover.git
$ cd naiClover
$ cd client
$ npm i
$ cd ../server
$ npm i
```

## Stacks
**Environment** 

<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/Git Hub-181717?style=for-the-badge&logo=GitHub&logoColor=white">

**Communication**

<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"> 

**FRONTEND**

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/ReactCookie-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Axios-A29E4?style=for-the-badge&logo=Axios&logoColor=white">  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">  <img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=Swiper&logoColor=white">  

**BACKEND**

<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Bcrypt-000000?style=for-the-badge&logo=Bcrypt&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/MySQLSession-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
<img src="https://img.shields.io/badge/Multer-000000?style=for-the-badge&logo=&logoColor=white"> <img src="https://img.shields.io/badge/Cors-000000?style=for-the-badge&logo=&logoColor=white"> <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">

**Config**

<img src="https://img.shields.io/badge/Dotenv-ECD53F?style=for-the-badge&logo=Dotenv&logoColor=white"> <img src="https://img.shields.io/badge/Npm-CB3837?style=for-the-badge&logo=Npm&logoColor=white">

**Deploy**

<img src="https://img.shields.io/badge/Pm2-2B037A?style=for-the-badge&logo=Pm2&logoColor=white"> <img src="https://img.shields.io/badge/Ec2-FF9900?style=for-the-badge&logo=Amazon Ec2&logoColor=white"> <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"> 


## 화면구성

|메인페이지|
|------|
|<img src="https://github.com/JHSasdf/NaiClover/assets/146299597/0218834d-8969-4f36-b337-b0cdbd89674b" width= "300" height= "500"/>  <img src="https://github.com/JHSasdf/NaiClover/assets/146299597/545177b3-8fd0-4ff8-bcf4-0b2b94b42912" width= "300" height= "500"/>|




|로그인, 회원가입 페이지|
|------|
|<img src="https://github.com/JHSasdf/NaiClover/assets/146299597/4bc3b825-ebdd-4b56-8e6a-b3a0362a965b" width= "300" height= "500"/>  <img src="https://github.com/JHSasdf/NaiClover/assets/146299597/d655b49c-7411-49bc-9d7c-82684efab1b4" width= "300" height= "500"/>|


|1:1 채팅룸, 채팅방, monoChat 채팅룸, 채팅방|
|------|
|<img src="https://github.com/JHSasdf/NaiClover/assets/146299597/a0cd10fd-c3e9-4f03-81c6-a8aebb90bbb4" width= "300" height= "500"/>  <img src="https://github.com/JHSasdf/NaiClover/assets/146299597/3b8f8b18-d961-45f0-b158-d7c4d0c72721" width= "300" height= "500"/><img src="https://github.com/JHSasdf/NaiClover/assets/146299597/f022aa86-ab4b-40f3-9ca8-2b95a32ee49b" width= "300" height= "500"/> <img src="https://github.com/JHSasdf/NaiClover/assets/146299597/9d4796b8-b465-47b7-b24a-abdad5074890" width= "300" height= "500"/>|

|마이페이지, searchUser 페이지|
|------|
|<img src="https://github.com/JHSasdf/NaiClover/assets/146299597/1fea4b26-9643-4475-8bf9-b312c2b9deab" width= "300" height= "500"/>  <img src="https://github.com/JHSasdf/NaiClover/assets/146299597/10b21a2b-dcf5-44db-8c9f-2b0ebb1ff5e7" width= "300" height= "500"/>|




## 추가 사항

### ver.1.1
1. 뒤로가기 시 현재 접속중 인원 반영 안되던 버그 수정
2. 댓글로 Error Log 작성시 페이지 새로고침을 해야 반영되던 버그 수정
3. language post에서 댓글 삭제 안되던 버그 수정
4. 마이페이지 팔로우 한 사람 목록에서 상대방 이름이 아닌 내 이름 뜨던 버그 수정
5. 마이페이지 내 post에서 내 이름이 아닌 id가 뜨는 버그 수정

### ver.1.2
1. app.ts 리팩토링
2. 프론트 편의성 개선
   
프로젝트 회고록 블로그 https://kimsunji.tistory.com/35
