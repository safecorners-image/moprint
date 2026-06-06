-- Supabase SQL Editor에서 실행하세요
-- diaries 테이블 생성

create table if not exists diaries (
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

-- 최신순 조회를 위한 인덱스
create index if not exists diaries_created_at_idx on diaries (created_at desc);

-- Phase 2: Auth 도입 전까지 익명 CRUD 허용
alter table diaries enable row level security;

drop policy if exists "Allow anon read diaries" on diaries;
drop policy if exists "Allow anon insert diaries" on diaries;
drop policy if exists "Allow anon delete diaries" on diaries;

create policy "Allow anon read diaries"
on diaries for select
to anon
using (true);

create policy "Allow anon insert diaries"
on diaries for insert
to anon
with check (true);

create policy "Allow anon delete diaries"
on diaries for delete
to anon
using (true);

-- Supabase Storage: public bucket이어도 업로드에는 storage.objects 정책이 필요합니다.
-- Supabase Dashboard에서 diary-images 버킷을 먼저 생성한 뒤 실행하세요.
drop policy if exists "Allow anon read diary images" on storage.objects;
drop policy if exists "Allow anon upload diary images" on storage.objects;

create policy "Allow anon read diary images"
on storage.objects for select
to anon
using (bucket_id = 'diary-images');

create policy "Allow anon upload diary images"
on storage.objects for insert
to anon
with check (bucket_id = 'diary-images');
