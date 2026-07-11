# PROGRESS

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
