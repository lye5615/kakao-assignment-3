# 과제3 Issue 작성 참고

## 0. 전체 구조 잡기

### AI 활용 프롬프트

```text
기존 React Todo 앱을 Next.js App Router 프론트엔드와 FastAPI 백엔드 구조로
마이그레이션하려고 해. frontend와 backend의 책임을 분리하고,
기능 단위로 커밋할 수 있는 프로젝트 구조를 제안해줘.
```

### 적용 내용

- Next.js와 FastAPI 디렉터리를 분리했습니다.
- 기존 프론트의 렌더링 책임과 서버 데이터 책임을 구분했습니다.
- 독립 Git 저장소를 만들고 원격 main 브랜치에 연결했습니다.

## FastAPI Todo CRUD API

### AI 활용 프롬프트

```text
FastAPI, SQLAlchemy, SQLite, Pydantic v2로 Todo CRUD API를 구현해줘.
Todo는 id, text, is_completed를 가지며 공백 입력과 없는 ID를 처리해줘.
```

### 적용 내용

- DB 모델, 요청/응답 스키마, 세션 의존성을 구성했습니다.
- CRUD와 422/404 예외 흐름을 구현했습니다.
- TestClient 기반 자동 테스트로 동작을 확인했습니다.

## Next.js 페이지와 API 연동

### AI 활용 프롬프트

```text
Next.js App Router에서 Todo 목록, 생성, 수정 페이지를 만들고,
Server Component와 Client Component의 역할을 구분해줘.
클라이언트 요청은 Axios와 route.ts를 거쳐 FastAPI로 전달해줘.
```

### 적용 내용

- 목록과 상세 조회는 Server Component에서 처리했습니다.
- 입력, 완료, 삭제는 Client Component에서 처리했습니다.
- Route Handler가 FastAPI 응답 상태와 오류를 프론트로 전달합니다.

## 서버 필터링과 검색

### AI 활용 프롬프트

```text
Todo 필터와 검색 상태를 URL 파라미터로 관리하고,
FastAPI가 SQLite에서 조건에 맞는 Todo만 조회하도록 구현해줘.
검색은 300ms 디바운스를 적용하고 필터와 동시에 사용할 수 있어야 해.
```

### 적용 내용

- `filter`와 `search`를 URL에 저장했습니다.
- 필터 전환, 새로고침, CRUD 이후에도 현재 조건이 유지됩니다.
- 조건 결합이 서버에서 처리되는지 자동 테스트로 확인했습니다.

## 라이트/다크 테마

### AI 활용 프롬프트

```text
Next.js에서 라이트/다크 테마를 구현해줘.
선택값은 쿠키에 저장하고 Root Layout에서 읽어 새로고침 후에도 유지하며,
CSS 변수와 data-theme으로 전체 UI 색상을 변경해줘.
```

### 적용 내용

- Root Layout이 서버에서 테마 쿠키를 읽습니다.
- 해/달 버튼이 쿠키와 `data-theme`을 함께 변경합니다.
- `#672be0`을 중심으로 라이트/다크 색상 토큰을 구성했습니다.
