# 과제 3. Next.js와 FastAPI로 Todo 앱 만들기

React 기반 Todo 앱을 Next.js App Router와 FastAPI 구조로 확장한 풀스택 과제입니다.
Todo 데이터는 브라우저 로컬스토리지가 아닌 SQLite 데이터베이스에 저장됩니다.

---

## 프로젝트 구조

```text
kakao-assignment-3/
├── frontend/
│   ├── app/
│   │   ├── api/todos/           # FastAPI 프록시 Route Handler
│   │   ├── todos/               # 목록, 생성, 수정 페이지
│   │   ├── actions.ts           # Server Component 조회 함수
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── tests/test_todos.py
│   ├── .env.example
│   ├── main.py
│   └── requirements.txt
└── docs/issue-notes.md
```

---

## 구현 기능

### 기본 미션

- Next.js App Router 기반 Todo 목록, 생성, 수정 페이지
- FastAPI와 SQLAlchemy 기반 Todo CRUD API
- SQLite 데이터 영구 저장
- Server Component와 Client Component 역할 분리
- Axios 기반 Next.js Route Handler 프록시
- 로딩, 오류, 빈 상태 화면
- 프론트엔드와 백엔드 환경변수 분리

### 도전 미션

- `?filter=active`, `?filter=completed` URL 기반 상태 필터
- `?search=키워드` URL 기반 Todo 검색
- 필터와 검색 조건의 서버 DB 동시 적용
- 검색 입력 300ms 디바운스

### 추가 기능

- 쿠키에 저장되는 라이트/다크 테마
- 저장된 테마가 없을 때 사용자 현지 시간에 따른 자동 테마
- 반응형 레이아웃
- 공백 및 500자 초과 입력 검증
- 삭제 전 확인과 요청 오류 메시지

---

## 활용 스택

| Frontend | Backend |
| --- | --- |
| Next.js 16 | FastAPI |
| React 19 | Uvicorn |
| TypeScript 5 | SQLAlchemy 2 |
| Tailwind CSS 4 | SQLite |
| Axios | Pydantic 2 |

---

## 실행 방법

### 1. 백엔드

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env.local
uvicorn main:app --reload
```

- API: http://localhost:8000
- Swagger 문서: http://localhost:8000/docs

### 2. 프론트엔드

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

- Todo 앱: http://localhost:3000/todos

---

## 환경변수

```dotenv
# frontend/.env.local
NEXT_PUBLIC_API_URL=/api
BACKEND_URL=http://127.0.0.1:8000

# backend/.env.local
DATABASE_URL=sqlite:///./todos.db
FRONTEND_ORIGIN=http://localhost:3000
```

`.env.local`은 Git에 포함하지 않으며, 저장소의 `.env.example`을 복사해 사용합니다.

---

## API

| Method | URL | 설명 |
| --- | --- | --- |
| GET | `/todos` | Todo 목록 조회 |
| GET | `/todos/{id}` | Todo 상세 조회 |
| POST | `/todos` | Todo 생성 |
| PUT | `/todos/{id}` | Todo 수정 및 완료 처리 |
| DELETE | `/todos/{id}` | Todo 삭제 |
| GET | `/todos?filter=active` | 진행 중 Todo 조회 |
| GET | `/todos?filter=completed` | 완료 Todo 조회 |
| GET | `/todos?search=키워드` | Todo 검색 |

클라이언트 요청은 `/api/todos` Route Handler를 거쳐 FastAPI로 전달됩니다.
Server Component의 목록 및 상세 조회는 서버에서 FastAPI를 직접 호출합니다.

---

## 검증 명령

```bash
# Backend
cd backend
.venv/bin/pytest -q -p no:cacheprovider

# Frontend
cd frontend
npm run lint
npm run build
```

---

## 제출 전 체크리스트

### 기능 구현

- [x] 필수 기능이 모두 구현되어 있다
- [x] README.md에 구현 기능과 실행 방법을 작성했다
- [x] 빈 입력값, 없는 Todo, 데이터 없는 상태를 처리했다
- [x] 새로고침 후에도 SQLite 데이터와 테마 설정이 유지된다

### 코드 품질

- [x] 불필요한 `console.log`와 사용하지 않는 코드를 제거했다
- [x] 변수명과 함수명이 역할을 명확히 나타낸다
- [x] 반복되는 API 및 URL 로직을 함수와 컴포넌트로 분리했다
- [x] TypeScript, ESLint, Python 코드 포맷이 일관적이다

### UI/UX

- [x] CRUD, 필터, 검색, 테마 기능을 UI에서 확인할 수 있다
- [x] 로딩, 오류, 빈 상태 화면이 구현되어 있다
- [x] 모바일과 데스크톱 레이아웃을 지원한다

### 검증

- [x] FastAPI 자동 테스트가 통과한다
- [x] Next.js lint와 production build가 통과한다
- [x] 프론트 Route Handler와 FastAPI CRUD 흐름을 확인했다

### 프로젝트 구조

- [x] frontend와 backend 디렉터리가 분리되어 있다
- [x] `node_modules`, `.venv`, DB, 환경변수 파일이 Git에서 제외된다
