# Stitch → Next.js 변환 파이프라인

Google Stitch("Premium Dark E-Commerce" / AETHER) 디자인을 Next.js 페이지로 옮길 때 사용한 스크립트 모음입니다.
**최초 부트스트랩용**입니다. 현재 `app/**/page.tsx`는 이후 수작업(내비게이션 배선·여백 수정 등)이 들어갔으므로
**소스 오브 트루스는 생성된 페이지 파일**입니다. 아래 스크립트는 *새 Stitch 화면을 추가로 가져올 때* 참고/재사용합니다.

> ⚠️ `convert.py`를 그대로 다시 돌리면 기존 페이지의 수작업 수정(내비 링크, `pt-32` 여백 등)이 **덮어써집니다.**
> 새 화면만 골라서 변환하거나, 변환 후 `wire_nav.py`를 다시 적용하세요.

## 전체 흐름 (새 Stitch 화면 반영 시)

1. **Stitch MCP 연결 확인** — `claude mcp list`에 `stitch ✓ Connected`. 없으면:
   ```bash
   set -a; source .env; set +a
   claude mcp add --transport http stitch https://stitch.googleapis.com/mcp \
     --header "X-Goog-Api-Key: ${STITCH_API_KEY}" --scope local
   ```
   추가 후 **세션 재시작**해야 도구(`mcp__stitch__*`)가 로드됨.

2. **화면 목록/HTML 내려받기** — `mcp__stitch__list_screens` → 각 화면 `get_screen`으로
   `htmlCode.downloadUrl` 얻어 `stitch-export/html/<slug>.html`로 저장.

3. **이미지 로컬화** — 각 HTML의 `lh3.googleusercontent.com` 이미지를 `public/assets/stitch/`로 다운로드하고
   HTML 내 URL을 로컬 경로로 치환. (매핑은 `stitch-export/image-map.txt`)
   - 주의: URL 추출 시 `url('...')` 안의 닫는 `')`까지 삼키지 않도록 정규식 경계 처리.

4. **HTML → JSX 변환** — `python3 tools/stitch/convert.py`
   - `<body>` 추출, `<script>`/주석 제거, `class→className`, `for→htmlFor`,
     `style="" → style={{}}`(camelCase), boolean/숫자 속성 정규화, `data-alt→alt`, void 태그 self-close.
   - `PAGES` 딕셔너리에서 slug→라우트/컴포넌트명/타이틀 매핑을 관리.

5. **커스텀 CSS 추출** — `python3 tools/stitch/extract_css.py`
   - 각 페이지 `<head>`의 `<style>`에서 커스텀 클래스만 뽑아 `theme()`→hex로 해석,
     `app/stitch-pages.css`로 통합. (`body{}`, 폰트 유틸, `.material-symbols-outlined` 중복은 제외)

6. **내비게이션 배선** — `python3 tools/stitch/wire_nav.py`
   - `href="#"` 앵커를 링크 텍스트 기준으로 실제 라우트에 연결, 헤더 아이콘 `<button>`→`<a href>` 변환.
   - **멱등**(이미 배선된 링크는 건드리지 않음).

7. **검증** — `npm run build` → 서버 기동(`PORT=3210 npm run dev`) → Playwright 스모크(에러/오버플로/이미지/내비 클릭).

## 파일
- `convert.py` — HTML→JSX 페이지 생성 (slug↔라우트 매핑 포함)
- `extract_css.py` — 페이지별 커스텀 CSS 추출·정제 → `app/stitch-pages.css`
- `wire_nav.py` — 내부 링크/아이콘 내비게이션 배선

## 디자인 토큰
`tailwind.config.ts`가 Stitch 디자인 시스템 토큰(색/간격/폰트 유틸)의 SSOT.
프로젝트/화면 원본 참고: `stitch-export/`, `stitch-export/html/DESIGN.md`.
