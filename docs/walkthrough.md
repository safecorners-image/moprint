# MoPrint 작업 기록

---

## Phase 1: Private(나만 보기) 일기 핵심 기능 (완료)

### 구현 내용
- **디자인 시스템**: 크림색 종이 캔버스(`#fffaf0`), 파스텔 5색 카드, Quicksand / 고운 돋움 서체, 폴라로이드 스타일 카드 컴포넌트
- **데이터 저장**: LocalStorage 기반 일기 CRUD + HTML Canvas 이미지 압축 (최대 800px, JPEG 70%)
- **주요 컴포넌트**:
  - `DiaryForm.jsx`: 실시간 폴라로이드 미리보기, 기분 컬러 선택, 사진 업로드
  - `DiaryFeed.jsx`: 검색 기능이 포함된 최신순 타임라인 피드
  - `DiaryDetailModal.jsx`: 블러 오버레이 상세 뷰어

### Git 이력
| 커밋 | 설명 |
|---|---|
| `8537437` | Initial commit: 브랜드 디자인 시스템(DESIGN.md) 등록 |
| `222eba2` | Feat: 1단계 - Private(나만 보기) 일기 핵심 기능 구현 및 문서 등록 |

---

## Phase 2: Supabase DB + Storage 마이그레이션 (예정)

### 목표
- 기존 LocalStorage → Supabase PostgreSQL DB로 완전 교체
- 이미지 저장 방식: base64 → Supabase Storage URL 방식으로 전환
- `user_id` 컬럼 설계 포함 (실제 Auth 기능은 다음 단계)

### 주요 변경 파일
| 파일 | 변경 내용 |
|---|---|
| `src/lib/supabaseClient.js` | [NEW] Supabase 클라이언트 초기화 |
| `src/utils/db.js` | LocalStorage → Supabase DB CRUD |
| `src/utils/imageCompressor.js` | base64 → Storage 업로드 & URL 반환 |
| `src/App.jsx` | 동기 → 비동기 데이터 로드 |
| `src/components/DiaryForm.jsx` | Storage 업로드 방식으로 전환 |
