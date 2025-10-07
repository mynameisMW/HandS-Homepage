# 🖥️ HandS Homepage

> 고려대학교 전기전자공학부 학술동아리 **HandS (Hardware and Software)** 공식 홈페이지 프로젝트입니다.  
> 학회의 활동, 프로젝트, 세미나 및 회원 관리 시스템을 통합 제공하는 **풀스택 웹 애플리케이션**입니다.

---

## 🚀 프로젝트 개요

HandS는 전기전자공학부 소속 하드웨어·소프트웨어 융합 학술동아리로,  
이 프로젝트는 학회의 소개와 내부 관리 시스템을 통합한 웹 플랫폼을 구축하기 위해 시작되었습니다.

### 🎯 주요 목표
- 학회 및 프로젝트 소개 페이지 제공  
- 회원 가입 / 로그인 / 권한 기반 관리자 시스템  
- Notion API 연동을 통한 게시글 자동 업데이트  
- Docker 기반의 손쉬운 배포 환경 구성  

---

## 🏗️ 기술 스택

| 분야 | 기술 |
|------|------|
| **Frontend** | Next.js 14, TypeScript, (선택) Tailwind CSS |
| **Backend** | FastAPI, SQLite (SQLAlchemy), JWT 인증 |
| **Infra** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions, Docker Hub / (대안) GHCR |
| **ETC** | Notion API 연동, Uvicorn 서버 |

---

## 📁 폴더 구조

~~~plaintext
HandS-Homepage/
├── backend/                 # FastAPI 서버
│   ├── api/                 # 로그인, 사용자 관리, Notion 연동 등
│   ├── database/            # DB 및 ORM 관리
│   ├── main.py              # FastAPI 엔트리포인트
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                # Next.js 프론트엔드
│   ├── app/                 # 페이지 구성
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml       # 전체 서비스 통합 실행 파일
├── .env                     # 환경변수 (SECRET_KEY 등) ※ 깃허브에 올리지 말 것
├── .gitignore
└── README.md
~~~

---

## 🐳 Docker 실행 방법

### 1️⃣ `.env` 파일 작성
루트(`HandS-Homepage/`)에 `.env` 파일을 만들고 다음을 입력:

~~~env
SECRET_KEY=supersecretkey123
ALGORITHM=HS256
NOTION_TOKEN=your_notion_api_token
~~~

> `.env`는 **커밋 금지**. `.gitignore`와 `.dockerignore`에 포함되어야 합니다.

### 2️⃣ Docker Compose 빌드 및 실행

~~~bash
docker compose build
docker compose up -d
~~~

### 3️⃣ 확인
- **Frontend:** http://localhost:3000  
- **Backend:** http://localhost:8000/docs  

---

## 🧱 개발 환경 (로컬 실행)

### 🖥️ Frontend

~~~bash
cd frontend
npm install
npm run dev
~~~

### ⚙️ Backend

~~~bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
~~~

---

## 🔄 CI/CD (GitHub Actions)

- `main` 브랜치에 push 시(예시 파이프라인):
  1. Frontend / Backend Docker 이미지 자동 빌드  
  2. Docker Hub(또는 GHCR)로 push  
  3. 원격 서버 SSH 접속 → `docker compose up -d`로 무중단 반영

> 비밀 키(`SECRET_KEY`, `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_KEY` 등)는  
> **GitHub Secrets**에 등록하여 관리하세요.

---

## 🧹 .gitignore / .dockerignore 권장

~~~plaintext
# 공통
__pycache__/
*.pyc
*.pyo
.env
.vscode/
.idea/
.git/
notebooks/
data/
tests/

# Frontend
node_modules/
.next/
dist/
~~~

---

## 👥 개발 

| 이름 |
|------|
| **이무원** |


> HandS — Hardware and Software,  
> “배움의 즐거움과 창조의 가치”를 함께 만드는 엔지니어들의 공간.

---

## 📜 라이선스

MIT License © 2025 HandS, Korea University Electrical and Electronic Engineering
