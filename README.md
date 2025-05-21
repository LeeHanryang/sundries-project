# Sundries Project

## 프로젝트 개요

Nuxt 3 기반의 웹 애플리케이션 프로젝트입니다.

## 기술 스택

- **프레임워크**: Nuxt 3
- **UI 라이브러리**:
  - Nuxt UI (Tailwind + Reka)
  - Iconify
- **상태 관리**: Pinia
- **이미지 최적화**: Nuxt Image
- **코드 품질**: ESLint

## 현재 구현된 기능

### 1. 레이아웃

- 반응형 헤더 구현
- 다크 모드 지원
- 그라데이션 배경 적용

### 2. 인증 시스템

- 로그인 페이지 구현
  - 이메일/비밀번호 로그인
  - 소셜 로그인 (Google, naver, kakao)
  - 익명 로그인
  - 아이디 저장 기능
  - 자동 로그인 기능
- 인증 상태 관리 (Pinia store)

### 3. UI/UX

- 모던한 디자인 시스템 적용
- 반응형 레이아웃
- 다크 모드 지원
- 사용자 친화적인 폼 디자인
- 소셜 로그인 버튼 구현

## 진행 중인 작업

1. Nuxt Auth 구현
   - `@sidebase/nuxt-auth` 통합
   - OAuth 제공자 설정
   - 인증 미들웨어 구현

## 남은 작업

1. **인증 시스템**

   - OAuth 제공자 설정
   - 환경 변수 설정
   - 실제 인증 로직 구현

2. **기능 구현**

   - 사용자 프로필
   - 메인 페이지 구현

3. **보안**

   - CSRF 보호
   - Rate limiting
   - 보안 헤더 설정

4. **테스트**
   - 단위 테스트
   - 통합 테스트
   - E2E 테스트

## 환경 설정

### 필수 환경 변수

```env
# Auth
AUTH_SECRET="your-secret-key"
AUTH_ORIGIN="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Naver OAuth
NAVER_CLIENT_ID="your-naver-client-id"
NAVER_CLIENT_SECRET="your-naver-client-secret"

# Kakao OAuth
KAKAO_CLIENT_ID="your-kakao-client-id"
KAKAO_CLIENT_SECRET="your-kakao-client-secret"
```

## 설치 및 실행

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

## 프로젝트 구조

```
├── assets/          # 정적 자산
├── components/      # Vue 컴포넌트
├── composables/     # 컴포저블 함수
├── layouts/         # 레이아웃 컴포넌트
├── pages/          # 페이지 컴포넌트
├── public/         # 정적 파일
├── server/         # 서버 API
└── stores/         # Pinia 스토어
```

## 참고사항

- Nuxt 3의 최신 기능들을 활용
- TypeScript를 사용한 타입 안정성 확보
- 모던 웹 개발 모범 사례 적용
