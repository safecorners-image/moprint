# MoPrint (Momentary + Print) - Phase 1: Private Core Features

- [x] 프로젝트 환경 설정
  - [x] Vite + React 프로젝트 초기화
  - [x] 패키지 설치 (`npm install`)
  - [x] 필요 없는 기본 파일(assets, css 등) 정리
- [x] 디자인 시스템 연동 및 기본 레이아웃 구성
  - [x] `src/index.css`에 디자인 토큰(CSS 변수) 정의 (크림 배경, 파스텔 톤 카드, 둥글기 등)
  - [x] 구글 폰트(Quicksand & Gowun Dodum) 연동 (`index.html`)
  - [x] 메인 대시보드 프레임 및 네비게이션 구조 개발 (`src/App.jsx`)
- [x] 데이터 엔진 및 유틸리티 구현
  - [x] LocalStorage 일기 저장/로드 유틸리티 설계 (`src/utils/db.js`)
  - [x] HTML Canvas 기반 이미지 압축 및 Base64 변환 유틸리티 구현 (`src/utils/imageCompressor.js`)
- [x] 컴포넌트 개발
  - [x] 일기 작성 폼 컴포넌트 (`src/components/DiaryForm.jsx`)
  - [x] 폴라로이드 스타일 일기 카드 및 타임라인 피드 컴포넌트 (`src/components/DiaryFeed.jsx`)
  - [x] 일기 디테일 모달/뷰어 구현
- [x] 검증 및 최종 조율
  - [x] 빌드 테스트 (`npm run build`)
  - [x] 이미지 업로드 용량 제한 대응 테스트 및 모바일 반응형 레이아웃 확인
