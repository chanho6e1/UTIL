# UTIL

<br>

## 개발기간

**2023.01.03 ~ 2023.2.17 (7주)**

<br>

## 기술 스택


**💻Front-end**

React, React-router-dom, Redux-toolkit, TOAST UI, AXIOS, react-easy-swipe, mui

- TOAST UI : 글작성시 마크다운적용

- react-easy-swipe : 메뉴에 스와이프 적용

- mui : UI/UX 일부에 사용된 라이브러리

**💻Back-end**

Java, Spring Boot, QueryDSL, JPA

- Springboot로 웹 어플리케이션 서버를 구축
- Spring Data JPA(Hibernate)로 객체 지향 데이터 로직 작성
- QueryDSL 사용으로 더 가독성 높은 코드 작성

**💾DB**

MySQL

- 데이터 베이스로 MySQL 사용

**🌐Network**

Nginx

<br>


## 주요 기능


#### 회원가입

- 구글 및 카카오 로그인 연동
- 피드에서 나의 관심태그에 맞춰 다른 유저 추천받기

<img src=https://user-images.githubusercontent.com/108286046/219239768-5d28c9d2-1dfe-4861-a8e4-5870f15e4046.gif></img>

<br>

#### 마이 유틸

- 마이 유틸에서 한눈에 확인하고, 목표/투두를 생성, 관리

- 시각적 효과를 높이기 위해 바 형태로 구현

- 목표와 Todo의 상태에 따라서 완료됨, 미완료, 진행중, 예정됨 4가지로 표시

<img src=https://user-images.githubusercontent.com/108286046/219240978-71e4abaa-2942-4370-ac19-845c998656f7.gif></img>

<br>

#### 포스트 작성

- 마크다운을 활용해 포스트를 작성

- Todo를 완료한뒤 오늘 배운것을 정리할 수 있는 포스트

- 작성시 목표와 링크할 수 있고, 목표의 디테일 페이지에서 확인가능

- 태그 설정 가능

<img src=https://user-images.githubusercontent.com/108286046/219243269-76173488-03af-42ee-aec9-c70c11e7ff36.gif></img>

<br>

#### 게시글 조회

- 팔로우한 유저들의 글을 보여줌

- 최신, 조회수, 좋아요 필터 적용

- 북마크 및 좋아요 댓글 기능

<img src=https://user-images.githubusercontent.com/108286046/219261393-121ec489-972e-41fc-9e49-2b11fb479111.gif></img>

<br>

#### 회고록 작성

- 목표를 수행하며 느낀 점을 회고록에 정리

- 회고록 또한 마크다운 적용 및 목표와 링크후 목표 디테일에서 링크된 포스트 확인 가능

<img src=https://user-images.githubusercontent.com/108286046/219248066-123d5ecd-62c2-4d14-9576-d5884e1b2569.gif></img>

<br>

#### 반응형

- 어떠한 플랫폼에서도 사용 가능하게 모든 페이지에 반응형을 적용

- 모바일과 PC의 포스트 카드를 따로 제작하여 최적화

- PC에선 페이지네이션, 모바일에선 무한스크롤 적용으로 편의성 개선

<img src=https://user-images.githubusercontent.com/108286046/219246995-b600c98e-fd96-4e30-ae5d-bb92c0dee7b0.gif></img>

<br>

## 프로젝트 구성도


<img src=https://user-images.githubusercontent.com/105181946/212804119-6a8317e9-a691-4775-8998-67db73946036.png></ing>

## 개발 팀 소개


| 김동주       | 남현지      | 박찬희      | 송기훈       | 이나연      | 최지훈       |
| --------- | -------- | -------- | --------- | -------- | --------- |
| Front-end | Back-end | Back-end | Front-end | Back-end | Front-end |

## 실행 방법


### **client 실행**

**1. 원격 저장소 복제**

```bash
$ git clone https://lab.ssafy.com/s08-webmobile2-sub2/S08P12D210.git
```

**2. 프로젝트 폴더로 이동**

```bash
$ cd client
```

**3. 필요한 node_modules 설치**

```bash
$ npm install --force
```

**4. 개발 서버 실행**

```bash
$ npm start
```

### **server 실행**

**1. 원격 저장소 복제**

```bash
$ git clone https://lab.ssafy.com/s08-webmobile2-sub2/S08P12D210.git
```

**2. 프로젝트 폴더로 이동**

```bash
$ cd server
```

**3. 프로젝트 폴더로 이동**
