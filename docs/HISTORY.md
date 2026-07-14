# 개발 히스토리 — AETHER (Premium Dark E-Commerce)

> **이 문서를 개발 시작 전에 먼저 읽으세요.** 맨 위 "다음 시작점"만 읽어도 바로 이어서 작업할 수 있습니다.
> 세부 세션 로그는 [`../PROGRESS.md`](../PROGRESS.md), 프로젝트 규칙은 [`../CLAUDE.md`](../CLAUDE.md) 참고.
> 최신 항목이 위로 오도록 유지합니다(역순).

---

## ▶ 다음 시작점 (현재 상태) — 2026-07-14 기준

**한 줄 요약**: 백엔드 API 레이어(libsql·Repository·Service·25개 API 라우트) 완성. 모든 페이지 API 연동 동적화. `next/image` 최적화·링크 정리까지 완료. 빌드 정상. 원격 미푸시.

**아키텍처 요약**
- **DB**: `data/aether.db` (libsql SQLite) — 12테이블, 시드 15상품·4컬렉션·2쿠폰
- **인증**: 세션 쿠키(`aether_session`) + in-memory 세션(globalThis, 포트폴리오용)
- **API**: `app/api/` 25개 라우트 (auth/cart/orders/products/collections/wishlist/reviews/contact)
- **상태**: `Providers` (AuthProvider + CartProvider) → `app/layout.tsx`에 주입

**바로 이어서 할 수 있는 일 (우선순위 순)**
1. **동작 테스트** — 회원가입→로그인→상품탐색→장바구니→체크아웃 전체 플로우 검증
2. (보안) `STITCH_API_KEY` **폐기(rotate)** — 이전 세션 문서에 평문 노출 이력 있음
3. 원격 저장소 연결 + 푸시 (사용자 진행 예정)
4. (선택) 동적 이미지 URL(`item.product_image_url` 등) `next/image` sizes 최적화

**개발 환경 복구 방법**
```bash
npm install
PORT=3210 npm run dev    # → http://localhost:3210  (3000 포트 점유 이슈)
npm run build            # 프로덕션 빌드 검증
```

**Stitch에서 화면을 더 추가하려면** → [`../tools/stitch/README.md`](../tools/stitch/README.md) 파이프라인 참고.

---

## 마일스톤 타임라인 (역순)

### 3단계 — 내비게이션 배선 & 레이아웃 수정  `f668f70`
- 14개 페이지 전부 링크 배선: 헤더 nav·로고·아이콘(검색/백/사람)·푸터·주요 CTA → 실제 라우트
  (아이콘은 `<button>`→`<a href>` 변환)
- 고정 헤더에 제목이 가려지던 **product-detail·wishlist·search**에 상단 여백(`pt-32`) 추가
- 이미지 로컬화 정규식이 `url('...')`의 닫는 `')`를 삼켜 깨졌던 배경이미지 style 복구
  (contact·brand-story·login·reviews)
- 검증: 내비 클릭 5/5 통과, 14개 페이지 콘솔에러·오버플로·깨진이미지 0
- `ae0da32` — 시각 QA용 Playwright devDependency 추가

### 2단계 — Stitch(AETHER) 14개 페이지 구현, Tailwind 전환  `2651b74`
- **Stitch MCP 연결**(local 스코프, `~/.claude.json`) → 세션 재시작 후 도구 로드
- Stitch "Premium Dark E-Commerce"(AETHER) 프로젝트 **14개 화면** 로컬 다운로드(`stitch-export/html/`)
  — 세션 중 추가된 My Curations·Reviews·Favorites 3개 포함
- 원격 lh3 이미지 **43개** `public/assets/stitch/`로 로컬화 + URL 치환
- **CSS Modules → Tailwind 전환**: Stitch 디자인 토큰을 `tailwind.config.ts`로 1:1 이식,
  폰트는 `next/font` 변수 연결, Material Symbols는 layout `<link>`
- 페이지별 커스텀 CSS를 `theme()`→hex로 해석해 `app/stitch-pages.css`로 통합
- HTML→JSX 변환기로 14개 라우트 생성, 브랜드 **MIDNIGHT → AETHER 통일**
- 구 MIDNIGHT 구성요소(components/·styles/·lib/) 제거

### 1단계 — Next.js 재구성 + git 초기화  `fc71a08`
- 초기 Vanilla HTML/JS/Vite(index.html·main.js·style.css, MIDNIGHT 랜딩) →
  **Next.js 14(App Router)+TS**로 재구성, 당시엔 CSS Modules + 디자인 토큰
- 원격 Unsplash 이미지 5개 로컬화, 장바구니 Context+useReducer 시제품
- Stitch API 키 평문 노출 문서 마스킹, `.gitignore`/`.env.example` 추가
- `git init` + 최초 커밋. `.env`·`docs/ai_analysis/`·`.claude/settings.local.json` 배포 제외

---

## 기술 스택 스냅샷 (현재)
- Next.js 14 (App Router) · React 18 · TypeScript(strict)
- **Tailwind CSS** + Stitch 디자인 토큰(`tailwind.config.ts`) · 커스텀 CSS는 `app/stitch-pages.css`
- 폰트: `next/font/google`(Anton/Inter/Playfair) + Material Symbols(`<link>`)
- 이미지: `public/assets/` 로컬화(원격 URL 금지), 현재 플레인 `<img>`
- 페이지: 전부 **정적 서버 컴포넌트** (상호작용/상태 로직 아직 없음)

## 라우트 맵 (14)
`/` 홈 · `/collections` · `/search` · `/products/[id]` 상세 · `/bag` 장바구니 · `/checkout` ·
`/wishlist` · `/favorites` · `/curations` · `/reviews` · `/orders` · `/login` · `/contact` · `/brand-story`

## 핵심 결정 & 이유
- **Vite → Next.js**: 라우팅/SSR/SEO 확장성.
- **CSS Modules → Tailwind**: Stitch 디자인이 Tailwind 기반 → 14개 페이지를 빠르고 충실하게 1:1 이식.
- **MIDNIGHT → AETHER**: Stitch 원본 디자인 브랜드에 통일(디자인 100% 일치).
- **이미지 전부 로컬화**: 원격 의존 제거, 프로젝트 규칙 준수.
- **정적 우선**: 먼저 디자인을 충실히 옮기고, 동작 로직은 후속 단계로 분리.

## 알려진 이슈 / 주의
- 샌드박스 bash가 긴 루프/PATH에서 불안정(타임아웃·command not found) → 벌크 작업은 **Python**으로 처리.
- 3000 포트 타 프로세스 점유 → 개발은 `PORT=3210`.
- `app/**/page.tsx`는 변환 후 **수작업 수정 포함** → `tools/stitch/convert.py`를 통째로 재실행하면 덮어써짐(주의).
- 과거 노출된 `STITCH_API_KEY`는 rotate 권장.
