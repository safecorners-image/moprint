# MoPrint (Momentary + Print) - 2단계: Supabase 마이그레이션

## Phase 1 (완료) ✅
- [x] 프로젝트 환경 설정 (Vite + React)
- [x] 디자인 시스템 연동 (크림 배경, 파스텔 톤, 폴라로이드 카드)
- [x] 구글 폰트(Quicksand & Gowun Dodum) 연동
- [x] LocalStorage 기반 일기 CRUD 구현
- [x] HTML Canvas 이미지 압축 (base64)
- [x] DiaryForm / DiaryFeed / DiaryDetailModal 컴포넌트 개발
- [x] 빌드 및 린트 검증
- [x] GitHub 업로드 (safecorners-image/moprint)

---

## Phase 2 (진행 중) 🔄

### 사전 준비
- [x] Supabase 프로젝트 생성 및 `.env` 파일 설정
- [x] Supabase Storage `diary-images` 버킷 생성
- [x] `.gitignore`에 `.env` 추가
- [x] `.env.example` 템플릿 파일 생성
- [x] 문서 업데이트 및 커밋

### 패키지 설치
- [ ] `@supabase/supabase-js` 설치

### Supabase 설정
- [ ] `diaries` 테이블 생성 (Supabase SQL Editor에서 실행)
- [ ] `src/lib/supabaseClient.js` Supabase 클라이언트 초기화 파일 생성

### 유틸리티 마이그레이션
- [ ] `src/utils/db.js` → Supabase DB CRUD로 교체
- [ ] `src/utils/imageCompressor.js` → Supabase Storage 업로드로 교체

### 컴포넌트 수정
- [ ] `src/App.jsx` → 비동기 데이터 로드로 전환
- [ ] `src/components/DiaryForm.jsx` → Storage 업로드 방식으로 전환

### 검증 및 배포
- [ ] 로컬 환경에서 Supabase 연동 동작 확인
- [ ] Vercel 환경 변수 등록 후 재배포
- [ ] 빌드 및 린트 통과 확인
- [ ] 문서 업데이트 및 커밋/푸시
