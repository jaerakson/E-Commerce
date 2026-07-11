# CLAUDE.md — MIDNIGHT E-Commerce

> 이 파일은 **프로젝트 고유** 규칙/정보입니다.
> 세션 연속성·보안·문서화 등 **전역 안정 규칙**은 `~/.claude/CLAUDE.md`를 따릅니다. (중복 기재하지 않음)
> 자주 바뀌는 진행 상황은 여기가 아니라 `PROGRESS.md`에 최신순으로 기록합니다.

---

## [프로젝트 개요]
- **프로젝트명**: MIDNIGHT (Premium Dark E-Commerce)
- **목적/한 줄 설명**: 영화 같은 다크 럭셔리 에스테틱의 프리미엄 셀렉트샵 랜딩 + 미니 장바구니.
- **주요 기술 스택**:
  - Next.js 14 (App Router) · React 18 · TypeScript (strict)
  - 스타일: CSS Modules + 디자인 토큰(`styles/tokens.css`), 프레임워크 CSS 미사용
  - 폰트: `next/font/google` 셀프 호스팅 (Anton / Inter / Playfair Display)
  - 이미지: `next/image` 최적화, 에셋은 전부 `public/assets/` 로컬화
  - 상태: 장바구니는 React Context + `useReducer` + localStorage (외부 상태 라이브러리 없음)
- **핵심 디렉터리 구조**:
  ```text
  app/
    layout.tsx        # 폰트 변수 주입, 메타데이터, CartProvider 래핑
    page.tsx          # 섹션 조합(홈)
    globals.css       # reset + 토큰 import + 공용 .btn/.container
  components/
    layout/           # Header(클라이언트, 카트 카운트) · Footer
    sections/         # Hero · EditorialIntro · ProductGallery · TechnicalDetails
    product/          # ProductCard(클라이언트, add-to-cart)
    cart/             # CartProvider(reducer) · CartDrawer(dialog)
  lib/
    products.ts       # 상품 데이터(단일 소스) + 타입
    format.ts         # formatKrw() 통화 포맷
  styles/
    tokens.css        # 컬러/타입 스케일/스페이싱/모션 토큰 (SSOT)
  public/assets/      # hero-bg.jpg + products/*.jpg (로컬 이미지)
  ```
- **빌드 명령어**: `npm run build`
- **테스트 명령어**: (미도입 — 추가 시 Playwright 시각 회귀 우선, `~/.claude/rules/ecc/web/testing.md` 참고)
- **실행 명령어**:
  - 개발: `npm run dev`  → **3000 포트 점유 이슈**로 필요 시 `PORT=3210 npm run dev`
  - 프로덕션: `npm run build && npm run start`
  - 린트: `npm run lint`
- **브랜치 전략**: 현재 **git 미초기화**. `git init` 이후 전략은 사용자와 합의 전까지 미확정 → 커밋/푸시 전 반드시 확인.
- **기본 원격/브랜치**: (미설정)

---

## [프로젝트 코드 규칙]

- **컴포넌트 분리**: 서버 컴포넌트가 기본. `useCart`/이벤트 핸들러가 필요한 것만 `"use client"`
  (현재 클라이언트: Header, ProductCard, CartProvider, CartDrawer).
- **디자인 토큰 우선**: 색·간격·타이포·모션 값은 하드코딩 금지. `styles/tokens.css`의 CSS 변수 참조.
  새 토큰이 필요하면 tokens.css에 먼저 추가 후 사용.
- **애니메이션**: compositor 친화 속성(`transform`/`opacity`)만 사용. layout 유발 속성 애니메이션 금지.
- **불변성**: 장바구니 등 상태는 항상 새 객체 반환(리듀서 각 분기 참고). in-place 변경 금지.
- **이미지**: 반드시 `next/image` + 명시적 크기(또는 `fill` + `sizes`). 원격 URL 직접 삽입 금지, `public/assets/`에 로컬화.
- **접근성**: 시맨틱 태그 우선, 인터랙션 요소에 `aria-label`/`:focus-visible`, `prefers-reduced-motion` 존중(globals.css에 전역 처리됨).
- **데이터**: 상품 등 정적 데이터는 `lib/products.ts` 단일 소스에서만 관리.

---

## [보안 / 시크릿]

- 시크릿은 `.env`(gitignore됨)로만 관리. 코드·문서·`PROGRESS.md`에 평문 금지(`[REDACTED]` 마스킹).
- `STITCH_API_KEY`: Stitch MCP(구글) 연동용. **과거 문서 평문 노출 이력이 있어 폐기(rotate) 필요** — 새 키로 교체 후 `.env`만 갱신.
- 런타임에서 시크릿을 쓸 경우 **서버 사이드에서만** `process.env`로 접근(클라이언트 번들 유출 방지).

---

## [알려진 이슈 / TODO]

- [ ] 노출됐던 Stitch API 키 폐기(rotate) — 우선순위 높음
- [ ] `git init` + 최초 커밋(브랜치 전략 확정 후)
- [ ] `postcss` transitive 취약점 2건 — Next.js 16 업그레이드 시 해소(브레이킹, 별도 검토)
- [ ] 테스트 도입(Playwright 시각 회귀 / 장바구니 유닛)
