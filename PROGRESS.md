# PROGRESS

## 2026-07-11 21:00  (집)
- 브랜치: main (git, 미푸시)
- 완료:
  - 14개 페이지 **내비게이션 배선**(헤더/로고/아이콘/푸터/CTA→라우트) + 고정헤더 여백 수정 + 배경이미지 url 복구 (`f668f70`)
  - Playwright 시각 QA로 전 페이지 점검(내비 클릭 5/5, 에러/오버플로/깨진이미지 0)
  - **히스토리 구성 정리**: `docs/HISTORY.md`(맨 위 "다음 시작점"만 읽어도 이어서 개발 가능),
    변환 파이프라인 스크립트를 `tools/stitch/`로 보존(convert/extract_css/wire_nav + README),
    `CLAUDE.md`에 "개발 시작 전 필수 절차" 추가
  - 개발 서버 기동 확인: `PORT=3210 npm run dev` → http://localhost:3210 (200)
- 현재 상태: 로컬에서 14개 페이지 정상 동작, 전부 커밋됨(작업 트리 클린)
- 다음 할 일: (HISTORY.md "다음 시작점" 참고) img→next/image, 폼/장바구니 동작 로직, products/[id] 동적화, 원격 푸시
- 관련 파일: `docs/HISTORY.md`, `tools/stitch/`, `app/**/page.tsx`
- 푸시 여부: 미푸시 (원격은 나중에 진행 예정)

## 2026-07-11 20:30  (집)
- 브랜치: main (git 초기화됨, 미푸시)
- 완료:
  - **Stitch MCP 연결** (local 스코프, `~/.claude.json`) → 세션 재시작 후 도구 로드
  - Stitch "Premium Dark E-Commerce"(AETHER) 프로젝트 **14개 화면 전부 로컬 다운로드** (`stitch-export/html/`)
    → Home/Collections/Search/ProductDetail/ShoppingBag/Checkout/Wishlist/Favorites/MyCurations/Reviews/OrderHistory/Login/Contact/BrandStory (+DESIGN.md, flow=home 중복 제외)
  - 원격 lh3 이미지 **43개 로컬화** (`public/assets/stitch/`) + HTML 내 URL 치환
  - **Tailwind 도입** + Stitch 디자인 토큰 1:1 이식(`tailwind.config.ts`), 폰트는 next/font 변수 연결, Material Symbols는 layout `<link>`
  - 페이지별 head `<style>` 커스텀 CSS를 `theme()`→hex로 해석해 `app/stitch-pages.css`로 통합
  - HTML→JSX 변환기로 **14개 라우트 생성**(`app/**/page.tsx`): 브랜드 **AETHER**로 통일
  - 구 MIDNIGHT 구성요소(components/·styles/·lib/) 제거
- 현재 상태: `npm run build` 성공(16 라우트 정적 생성, First Load JS 87.4kB), 서버 구동 후 14개 페이지 전부 200·이미지/CSS 정상 확인
- 다음 할 일:
  - **페이지 간 내비게이션 연결**: 현재 모든 `href="#"`(Stitch 그대로). 헤더/CTA를 실제 라우트로 배선
  - `<img>` → `next/image` 최적화(현재 플레인 img, lint warning)
  - 장바구니 상태(구 CartProvider 제거됨) 재도입 여부 결정 — Bag/Checkout 페이지는 현재 정적
  - product-detail 동적화(`[id]`별 데이터)
- 막힌 점/주의:
  - 샌드박스 bash가 긴 루프/PATH에서 불안정(타임아웃·command not found) → 벌크 작업은 Python으로 처리
  - 3000 포트 타 프로세스 점유 → `PORT=3210` 사용
- 관련 파일: `app/**/page.tsx`, `tailwind.config.ts`, `app/stitch-pages.css`, `public/assets/stitch/`, `stitch-export/`
- 푸시 여부: 미푸시 (커밋 대기)

## 2026-07-11 19:35  (집)
- 브랜치: (git 미초기화 — 로컬 작업)
- 완료:
  - Vanilla JS + Vite 사이트를 **Next.js 14 (App Router, TypeScript)** 로 재개발
  - 원격 Unsplash 이미지 5장(히어로 1 + 상품 4) → `public/assets/` 로컬화, `next/image` 최적화 적용
  - CSS를 **디자인 시스템으로 리팩터**: `styles/tokens.css`(컬러·타입·스페이싱·모션 토큰) + CSS Modules
  - 폰트(Anton/Inter/Playfair)를 `next/font` 로 self-host (외부 요청 제거)
  - 장바구니 로직 → React Context + useReducer(불변 상태) + localStorage 영속화 + Esc 닫기/스크롤 락
  - Stitch API 키 평문 노출 → 문서 마스킹(`[REDACTED]`), `.gitignore` / `.env.example` 추가
- 현재 상태: `npm run build` 성공(타입 통과, First Load JS 96 kB), 서버 구동·페이지·이미지 렌더 확인 완료
- 다음 할 일:
  - **노출됐던 Stitch API 키 폐기(rotate)** — 이미 평문으로 저장된 이력이 있으므로 필수
  - (선택) git init 후 최초 커밋, Next.js 16 업그레이드 시 남은 postcss transitive 취약점 해소
- 막힌 점/주의:
  - 로컬 3000 포트를 다른 node 프로세스가 점유 중 → 개발 시 `PORT=3210 npm run dev` 등으로 지정
- 관련 파일: `app/`, `components/`, `lib/`, `styles/tokens.css`, `public/assets/`
- 푸시 여부: 미푸시 (git 저장소 아님)
