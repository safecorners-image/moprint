import { useState } from 'react';
import DiaryForm from './components/DiaryForm';
import DiaryFeed from './components/DiaryFeed';
import DiaryDetailModal from './components/DiaryDetailModal';
import { loadDiaries, saveDiaries } from './utils/db';

export default function App() {
  const [diaries, setDiaries] = useState(() => loadDiaries());
  const [showForm, setShowForm] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [activeTab, setActiveTab] = useState('private'); // 'private', 'public', 'groups'

  // 일기 추가 핸들러
  const handleAddDiary = (newDiaryData) => {
    const newDiary = {
      id: Date.now().toString(),
      ...newDiaryData,
    };

    const updatedDiaries = [newDiary, ...diaries];
    setDiaries(updatedDiaries);
    
    try {
      saveDiaries(updatedDiaries);
      setShowForm(false);
    } catch (error) {
      alert(error.message);
    }
  };

  // 일기 삭제 핸들러
  const handleDeleteDiary = (id) => {
    const updatedDiaries = diaries.filter((d) => d.id !== id);
    setDiaries(updatedDiaries);
    saveDiaries(updatedDiaries);
  };

  // 상세 보기 모달 닫기
  const handleCloseModal = () => {
    setSelectedDiary(null);
  };

  return (
    <>
      {/* 상단 헤더 네비게이션 */}
      <header className="top-nav">
        <a href="/" className="logo" onClick={(e) => e.preventDefault()}>
          <span className="logo-icon">📸</span>
          <span className="logo-text">Mo<span>Print</span></span>
        </a>

        {/* 대시보드 탭 필터 */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab-btn ${activeTab === 'private' ? 'active' : ''}`}
            onClick={() => setActiveTab('private')}
          >
            🔒 나의 기록 (Private)
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'public' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('public');
              alert('모두의 순간(Public) 피드 기능은 다음 단계에서 업데이트됩니다. Private 기능부터 즐겨보세요! ✨');
              setActiveTab('private');
            }}
          >
            👥 모두의 순간 (Public)
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('groups');
              alert('그룹 공간(Groups) 공유 기능은 다음 단계에서 업데이트됩니다. Private 기능부터 즐겨보세요! ✨');
              setActiveTab('private');
            }}
          >
            📂 그룹 공간 (Groups)
          </button>
        </nav>

        {/* 새 글 작성 트리거 버튼 */}
        <button
          className="button-primary"
          onClick={() => setShowForm(!showForm)}
        >
          ✍️ {showForm ? '닫기' : '기록하기'}
        </button>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="container">
        <div className="header-info">
          <h1>인쇄하고 싶은 소중한 순간 📸</h1>
          <p>
            MoPrint는 매 순간(Momentary)의 스냅샷을 마음속에 인쇄(Print)하는 감성 일기장입니다.
          </p>
        </div>

        {/* 일기 쓰기 폼 */}
        {showForm && (
          <DiaryForm
            onAddDiary={handleAddDiary}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* 타임라인 피드 */}
        <DiaryFeed
          diaries={diaries}
          onDeleteDiary={handleDeleteDiary}
          onSelectDiary={setSelectedDiary}
        />
      </main>

      {/* 푸터 영역 (영수증 출력 콘셉트) */}
      <footer className="footer-print">
        <div className="footer-content">
          <div className="receipt-illustration">
            <span className="receipt-text">
              Every moment is worth printing.
            </span>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} MoPrint. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 일기 상세 정보 모달 팝업 */}
      {selectedDiary && (
        <DiaryDetailModal
          diary={selectedDiary}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
