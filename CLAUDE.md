# CLAUDE.md — AETHER (Premium Dark E-Commerce)

> 이 파일은 **프로젝트 고유** 규칙/정보입니다.
> 세션 연속성·보안·문서화 등 **전역 안정 규칙**은 `~/.claude/CLAUDE.md`를 따릅니다. (중복 기재하지 않음)
> 자주 바뀌는 진행 상황은 여기가 아니라 `PROGRESS.md`에 최신순으로 기록합니다.

---

## [개발 시작 전 필수 절차]  ★ 항상 먼저

1. **`docs/HISTORY.md` 최상단 "다음 시작점"을 먼저 읽는다.** — 현재 상태와 바로 이어서 할 일이 정리돼 있음.
2. 더 세부 로그가 필요하면 `PROGRESS.md` 최근 항목(맨 위 1~3개)을 읽는다.
3. 그다음 개발을 시작한다. 작업 단위가 끝나면 `PROGRESS.md`에 새 항목을 추가하고,
   프로젝트의 큰 상태 변화(마일스톤)는 `docs/HISTORY.md` "다음 시작점"과 타임라인을 갱신한다.
4. Stitch 화면을 추가로 가져올 때는 `tools/stitch/README.md`의 파이프라인을 따른다.

> 요약: **HISTORY.md(다음 시작점) → PROGRESS.md(최근 로그) → 개발 → 끝나면 두 문서 갱신.**

---

## [프로젝트 개요]
- **프로젝트명**: AETHER (Premium Dark E-Commerce) — 디자인 원본은 Google Stitch "Premium Dark E-Commerce"(Midnight Cinematic)
- **목적/한 줄 설명**: 영화 같은 다크 럭셔리 에스테틱의 프리미엄 셀렉트샵. Stitch 디자인 14개 화면을 Next.js로 구현.
- **주요 기술 스택**:
  - Next.js 14 (App Router) · React 18 · TypeScript (strict)
  - 스타일: **Tailwind CSS** + Stitch 디자인 토큰(`tailwind.config.ts`) · 페이지별 커스텀 CSS는 `app/stitch-pages.css`
  - 폰트: `next/font/google` 셀프 호스팅(Anton/Inter/Playfair, Tailwind fontFamily 변수 연결) + Material Symbols(layout `<link>`)
  - 이미지: 에셋 전부 `public/assets/` 로컬화(원격 URL 금지). 현재 페이지는 플레인 `<img>`(→ `next/image` 최적화는 TODO)
  - 디자인 원본: `stitch-export/html/*.html`(Stitch에서 내려받은 원본 HTML, 참고용)
- **핵심 디렉터리 구조**:
  ```text
  app/
    layout.tsx        # 폰트 변수 주입, 메타데이터, Material Symbols link, globals+stitch-pages import
    page.tsx          # 홈(AETHER Home)
    globals.css       # @tailwind + base + Material Symbols 클래스
    stitch-pages.css  # 페이지별 head <style>에서 추출한 커스텀 클래스(theme()→hex)
    <route>/page.tsx  # 각 페이지: collections, search, products/[id], bag, checkout,
                      #   wishlist, favorites, curations, reviews, orders, login, contact, brand-story
  tailwind.config.ts  # Stitch 디자인 토큰(색/간격/폰트 유틸) SSOT
  public/assets/stitch/  # Stitch 로컬 이미지 43개
  stitch-export/         # Stitch 원본 HTML + DESIGN.md + image-map(참고용)
  ```
- **빌드 명령어**: `npm run build`
- **테스트 명령어**: (미도입 — 추가 시 Playwright 시각 회귀 우선, `~/.claude/rules/ecc/web/testing.md` 참고)
- **실행 명령어**:
  - 개발: `npm run dev`  → **3000 포트 점유 이슈**로 필요 시 `PORT=3210 npm run dev`
  - 프로덕션: `npm run build && npm run start`
  - 린트: `npm run lint`
- **브랜치 전략**: git 초기화됨(현재 `main`, 원격 미설정). 전략 미확정 → 커밋/푸시 전 반드시 확인.
- **기본 원격/브랜치**: (원격 미설정 / main)

---

## [아키텍처 & 동작 방식 요약]

> 전체 상세: `docs/ai_analysis/20260711_AETHER_개발내용_상세정리.md` (로컬 전용, gitignore). 아래는 그 요약.

- **렌더링**: 각 라우트 `page.tsx`는 **정적 서버 컴포넌트**(현재 `"use client"` 없음). `app/layout.tsx`(공통 셸: html/body·폰트변수·Material Symbols `<link>`·CSS import)가 감싸 서버에서 HTML 생성. 데이터 fetch·상태·이벤트 없어 전부 정적 프리렌더.
- **스타일 3층 구조**:
  1. `tailwind.config.ts` — 색·간격·폰트·타이포 **토큰 SSOT**(빌드 시 유틸 생성)
  2. `app/globals.css` — `@tailwind` + base 레이어 + `.material-symbols-outlined`
  3. `app/stitch-pages.css` — Tailwind로 표현 안 되는 **페이지별 커스텀 클래스**(원본 `theme()`는 hex로 해석됨)
- **타이포**: 폰트패밀리 유틸과 폰트사이즈 유틸이 **같은 키 이름**이라 쌍으로 사용.
  예: `font-display-xl text-display-xl`(Anton 80), `font-body-lg text-body-lg`(Inter 18), `font-accent-serif text-accent-serif`(Playfair). 폰트는 next/font 변수(`--font-anton` 등)를 tailwind `fontFamily`가 참조.
- **색 핵심**: `primary-container #e32652`(Action-Raspberry, **구매/장바구니 전환 액션 전용**), `secondary-container #d0f100`(선택/활성), `background #121316`, `pitch-black #000`, `surface-deep #272c33`(카드), `charcoal-canvas #222326`(상품 카드).
- **공통 UI**: 헤더/푸터는 컴포넌트 분리 없이 **각 페이지에 인라인**(Stitch 원본 충실 이식 결과) → 향후 `SiteHeader`/`SiteFooter` 추출 여지.
- **내비게이션**: 내부 링크는 플레인 `<a href="/route">`(`tools/stitch/wire_nav.py`로 텍스트/아이콘 기준 배선). `next/link` 전환은 선택.
- **이미지**: `public/assets/stitch/` 43개 로컬. 렌더는 플레인 `<img>`(`next/image` 전환 TODO).

---

## [프로젝트 코드 규칙]

- **컴포넌트 분리**: 서버 컴포넌트가 기본. 현재 페이지는 정적(이벤트 핸들러 없음)이라 전부 서버 컴포넌트.
  상호작용(장바구니/폼 제출 등) 추가 시에만 `"use client"`.
- **디자인 토큰 우선**: 색·간격·타이포는 하드코딩 금지. `tailwind.config.ts`의 유틸(`bg-primary-container`,
  `text-body-lg`, `px-margin-desktop` 등) 사용. 새 토큰은 config에 먼저 추가.
- **커스텀 CSS**: Tailwind로 표현 안 되는 클래스는 `app/stitch-pages.css`에만 추가(theme()는 hex로).
- **애니메이션**: compositor 친화 속성(`transform`/`opacity`)만. layout 유발 속성 애니메이션 금지.
- **이미지**: 원격 URL 직접 삽입 금지, `public/assets/`에 로컬화. (`next/image` 전환은 TODO)
- **접근성**: 시맨틱 태그 우선, `aria-label`/`:focus-visible`, `prefers-reduced-motion` 존중(globals.css 전역 처리).
- **공통 UI**: 헤더/푸터가 페이지마다 인라인되어 있음 → 수정 시 여러 페이지 동기화 주의(추출 전까지). 링크는 `<a href>` 사용, 필요 시 `next/link`.
- **디자인 원본 갱신**: Stitch에서 화면이 추가/수정되면 `stitch-export/html/`로 다시 내려받아 재변환.
  변환 파이프라인 스크립트는 **`tools/stitch/`**(convert/extract_css/wire_nav) + `tools/stitch/README.md` 참고.
  ⚠️ `convert.py` 통째 재실행은 페이지의 수작업 수정(내비/여백)을 덮어씀 — **소스 오브 트루스는 생성된 `app/**/page.tsx`**.

---

## [보안 / 시크릿]

- 시크릿은 `.env`(gitignore됨)로만 관리. 코드·문서·`PROGRESS.md`에 평문 금지(`[REDACTED]` 마스킹).
- `STITCH_API_KEY`: Stitch MCP(구글) 연동용. **과거 문서 평문 노출 이력이 있어 폐기(rotate) 필요** — 새 키로 교체 후 `.env`만 갱신.
- 런타임에서 시크릿을 쓸 경우 **서버 사이드에서만** `process.env`로 접근(클라이언트 번들 유출 방지).

---

## [알려진 이슈 / TODO]

- [ ] 노출됐던 Stitch API 키 폐기(rotate) — **우선순위 높음**(보안)
- [ ] `<img>` → `next/image` 최적화(width/height 또는 fill+sizes)
- [ ] 폼/장바구니 **동작 로직** — login/checkout/bag/contact는 현재 정적 디자인
- [ ] `products/[id]` 동적 데이터화(현재 id 무관 동일 정적 렌더) + 상품 데이터 소스(`lib/`)
- [ ] 공통 헤더/푸터 `SiteHeader`/`SiteFooter` 컴포넌트 추출(중복 제거)
- [ ] 푸터 잔여 `href="#"` 링크(Shipping/Returns/Privacy) 정리, `next/link` 전환
- [ ] 원격 저장소 연결 + 푸시(사용자 진행 예정)
- [ ] `postcss` transitive 취약점 — Next.js 16 업그레이드 시 해소(브레이킹, 별도 검토)
- [ ] 테스트 자동화(Playwright 시각 회귀 / E2E / 장바구니 유닛)
- [ ] `package.json` name `midnight-ecommerce` → `aether` 정리(선택)

> ✅ 완료: git 초기화·초기 커밋, 14개 페이지 구현, 내비게이션 배선, 시각 QA(에러 0).
