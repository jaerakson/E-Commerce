# AETHER — Premium Dark E-Commerce

**AETHER**는 영화 같은 다크 럭셔리 감성의 프리미엄 셀렉트샵 쇼핑몰 프로젝트입니다. Google Stitch의 "Premium Dark E-Commerce" (Midnight Cinematic) 디자인 시안 14개를 모태로 하여 Next.js 14 (App Router) 환경에서 풀스택으로 완성도 높게 구현되었습니다.

---

## 🖤 Key Features (주요 기능)

- **16개의 다이나믹 페이지**: Home, Collections, Products (상세), Search, Bag (장바구니), Checkout, Wishlist, Favorites, Reviews, Orders, Login 등 전자상거래 핵심 페이지 전체 구현.
- **REST API 라우트 (25개)**: Auth, Cart, Orders, Products, Collections, Wishlist, Reviews 등 비즈니스 로직을 위한 풀스택 API 제공.
- **Libsql (SQLite) 로컬 DB**: 12개 스키마 테이블 구조 설계 및 더미 데이터(15개 프리미엄 상품, 4개 컬렉션, 2개 쿠폰 등) 자동 시딩.
- **Repository & Service 패턴**: 아키텍처 결합도를 낮추기 위해 데이터베이스 접근 레이어(Repository)와 비즈니스 로직 레이어(Service)를 명확히 분리하여 설계.
- **상태 관리 및 인증**: `AuthProvider` 및 `CartProvider`를 커스텀 훅(`useAuth`, `useCart`)과 연동하여 전역 장바구니 및 로그인 세션 실시간 동기화.
- **성능 최적화 (`next/image`)**: 기존 정적 이미지를 `next/image` 컴포넌트로 마이그레이션하여 이미지 지연 로딩(lazy loading) 및 최적 해상도 제공.
- **글로벌 내비게이션 배선**: 사이트 전반의 흐름을 유기적으로 이어주는 내비게이션 및 사이드바 동적 배선 완료.

---

## 🛠 Tech Stack (기술 스택)

### Frontend
- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS + Stitch Design Tokens (`tailwind.config.ts`), Custom Utility CSS (`app/stitch-pages.css`)
- **Fonts**: Self-hosted `next/font/google` (Anton, Inter, Playfair Display) + Material Symbols Outlined

### Backend & Database
- **Database**: Libsql (SQLite, `@libsql/client`)
- **Architecture**: Repository Pattern + Service Layer
- **Authentication**: Bcryptjs 기반 해싱 비밀번호 검증 + In-memory Session 관리

---

## 📂 Project Structure (폴더 구조)

```text
├── app/                  # Next.js App Router 페이지 및 API 라우트
│   ├── api/              # 25개의 REST API 엔드포인트
│   ├── collections/      # 컬렉션 페이지
│   ├── products/         # 상품 상세 페이지 ([id])
│   ├── bag/              # 장바구니 페이지
│   ├── checkout/         # 주문서 작성 페이지
│   ├── orders/           # 주문 내역 페이지
│   ├── globals.css       # Tailwind 및 글로벌 CSS
│   ├── stitch-pages.css  # 프리미엄 테마 전용 커스텀 스타일시트
│   └── layout.tsx        # 메인 레이아웃 및 Provider 주입
├── data/                 # SQLite 데이터베이스 파일 및 스키마/시드 SQL
├── lib/                  # 풀스택 백엔드 로직
│   ├── db/               # DB 연결 및 스키마 정의
│   ├── hooks/            # useAuth, useCart 등 프론트엔드 커스텀 훅
│   ├── repositories/     # Database Repository 레이어 (user, product, cart 등)
│   └── services/         # 비즈니스 서비스 레이어 (auth, order, review 등)
├── public/               # 로컬 정적 에셋 (Stitch 43개 로컬화 이미지 등)
├── tools/                # Stitch UI 변환 및 내비게이션 배선 자동화 툴
├── tailwind.config.ts    # Stitch 디자인 토큰 매핑 설정
└── tsconfig.json         # TypeScript 환경 정의
```

---

## 🚀 Getting Started (실행 방법)

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 구성
`.env.example` 파일을 복사하여 `.env` 파일을 생성합니다.
```bash
cp .env.example .env
```

### 3. 개발 서버 실행
3000번 포트 충돌 우려가 있을 경우 포트를 지정하여 실행할 수 있습니다.
```bash
# 기본 실행
npm run dev

# 포트 지정 실행 (추천)
PORT=3210 npm run dev
```
브라우저에서 `http://localhost:3210`으로 접속합니다.

### 4. 빌드 및 배포
```bash
npm run build
npm run start
```

---

## 📝 개발 이력 및 규칙 문서
- **[CLAUDE.md](file:///Users/liche/Documents/dev/E-Commerce/CLAUDE.md)**: 프로젝트 내 개발 가이드 및 스타일 규칙이 명시되어 있습니다.
- **[PROGRESS.md](file:///Users/liche/Documents/dev/E-Commerce/PROGRESS.md)**: 실시간 구현 진행 상황 및 세부 커밋 로그를 확인하실 수 있습니다.
- **[HISTORY.md](file:///Users/liche/Documents/dev/E-Commerce/docs/HISTORY.md)**: 거시적인 마일스톤 및 "다음 시작점" 정보를 담고 있습니다.
