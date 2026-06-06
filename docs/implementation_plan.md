# [구현 계획] Supabase DB + Storage 마이그레이션

기존 로컬 스토리지 기반의 일기 저장 방식을 **Supabase**로 완전히 교체합니다.
사진은 **Supabase Storage**에 업로드 후 URL만 DB에 보관하며,
현 단계는 익명 CRUD를 완성한 뒤 다음 단계에서 Auth를 붙이는 구조로 설계합니다.

## 변경 전 → 변경 후

| 항목 | 변경 전 | 변경 후 |
|---|---|---|
| 일기 저장 | LocalStorage (base64) | Supabase PostgreSQL DB |
| 이미지 저장 | LocalStorage (base64) | Supabase Storage (URL) |
| 사용자 인증 | 없음 | 컬럼만 준비, 다음 단계에서 추가 |
| 데이터 영속성 | 브라우저 한정 | 서버 DB (기기 무관) |

## Supabase 프로젝트 구성

> [!IMPORTANT]
> - 환경 변수는 `.env` 파일로 관리 (`.gitignore`에 등록, GitHub에 노출되지 않음)
> - `.env.example` 파일을 참고하여 키 설정
> - Vercel 배포 시 환경 변수 별도 등록 필요 (`Settings > Environment Variables`)

## DB 스키마

### `diaries` 테이블

```sql
create table diaries (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid,               -- 현재는 null 허용, 추후 auth.users 연동
  title       text not null,
  content     text not null,
  date        date not null,
  image_url   text,               -- Supabase Storage 공개 URL
  color       text default 'pink',
  visibility  text default 'private',
  created_at  timestamptz default now()
);
```

### Supabase Storage 버킷
- 버킷 이름: `diary-images`
- 접근 권한: Public (이미지 URL로 직접 접근 가능)

---

## Proposed Changes

### [패키지 설치]
```bash
npm install @supabase/supabase-js
```

### [환경 변수]

#### [NEW] `.env` (로컬 전용, Git 제외)
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### [NEW] `.env.example` (Git에 커밋, 템플릿용)
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

### [신규 파일]

#### [NEW] `src/lib/supabaseClient.js`
- `@supabase/supabase-js`를 이용한 Supabase 클라이언트 초기화 모듈.

---

### [수정 파일]

#### [MODIFY] `src/utils/db.js`
- 기존 LocalStorage CRUD → Supabase DB CRUD 함수로 완전 교체.
- `loadDiaries()`: `diaries` 테이블 전체 조회 (created_at 내림차순).
- `addDiary(diary)`: DB에 새 일기 삽입.
- `deleteDiary(id)`: 해당 ID 일기 삭제.

#### [MODIFY] `src/utils/imageCompressor.js`
- 기존 base64 반환 → Canvas 압축 후 Blob 변환 → Supabase Storage 업로드.
- 반환값: 업로드된 이미지의 공개 URL 문자열.

#### [MODIFY] `src/App.jsx`
- `useState(() => loadDiaries())` 방식 → `useEffect` + 비동기 fetch로 전환.
- 일기 추가/삭제 핸들러 비동기 처리.

#### [MODIFY] `src/components/DiaryForm.jsx`
- 이미지 업로드 시 base64 저장 → Supabase Storage 업로드 후 URL 저장 방식으로 전환.

---

## Verification Plan

### 수동 검증
1. 일기 작성 후 Supabase 대시보드 `Table Editor`에서 row 삽입 확인.
2. 사진 업로드 후 Supabase Storage `diary-images` 버킷에 이미지 파일 저장 확인.
3. 브라우저를 다른 기기/탭으로 열어도 일기 데이터가 동일하게 표시되는지 확인.
4. 일기 삭제 후 DB에서 해당 row 제거 확인.
5. Vercel에 환경 변수 등록 후 재배포 및 정상 동작 확인.
