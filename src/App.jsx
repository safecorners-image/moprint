import { useState, useEffect } from 'react';
import DiaryForm from './components/DiaryForm';
import DiaryFeed from './components/DiaryFeed';
import DiaryDetailModal from './components/DiaryDetailModal';
import { loadDiaries, addDiary, deleteDiary } from './utils/db';

export default function App() {
  const [diaries, setDiaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 최초 로드 시 Supabase에서 일기 가져오기
  useEffect(() => {
    const fetchDiaries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loadDiaries();
        setDiaries(data);
      } catch (err) {
        setError('일기를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiaries();
  }, []);

  // 일기 추가 핸들러
  const handleAddDiary = async (newDiaryData) => {
    try {
      const saved = await addDiary(newDiaryData);
      setDiaries((prev) => [saved, ...prev]);
      setShowForm(false);
    } catch (err) {
      alert('일기 저장에 실패했습니다. 다시 시도해 주세요.');
      console.error(err);
    }
  };

  // 일기 삭제 핸들러
  const handleDeleteDiary = async (id) => {
    try {
      await deleteDiary(id);
      setDiaries((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      alert('일기 삭제에 실패했습니다. 다시 시도해 주세요.');
      console.error(err);
    }
  };

  return (
    <>
      {/* 상단 헤더 네비게이션 */}
      <header className="top-nav">
        <a href="/" className="logo" onClick={(e) => e.preventDefault()}>
          <span className="logo-icon">📸</span>
          <span className="logo-text">Mo<span>Print</span></span>
        </a>

        <nav className="nav-tabs">
          <button className="nav-tab-btn active">
            🔒 나의 기록 (Private)
          </button>
          <button
            className="nav-tab-btn"
            onClick={() => alert('다음 단계에서 업데이트됩니다! ✨')}
          >
            👥 모두의 순간 (Public)
          </button>
          <button
            className="nav-tab-btn"
            onClick={() => alert('다음 단계에서 업데이트됩니다! ✨')}
          >
            📂 그룹 공간 (Groups)
          </button>
        </nav>

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
          <p>MoPrint는 매 순간(Momentary)의 스냅샷을 마음속에 인쇄(Print)하는 감성 일기장입니다.</p>
        </div>

        {/* 일기 쓰기 폼 */}
        {showForm && (
          <DiaryForm
            onAddDiary={handleAddDiary}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* 로딩 상태 */}
        {loading && (
          <div className="empty-state">
            <span className="empty-icon">⏳</span>
            <h3 className="empty-title">순간들을 불러오는 중...</h3>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !loading && (
          <div className="empty-state">
            <span className="empty-icon">😢</span>
            <h3 className="empty-title">{error}</h3>
            <p className="empty-text">네트워크 연결을 확인하고 새로고침 해주세요.</p>
          </div>
        )}

        {/* 타임라인 피드 */}
        {!loading && !error && (
          <DiaryFeed
            diaries={diaries}
            onDeleteDiary={handleDeleteDiary}
            onSelectDiary={setSelectedDiary}
          />
        )}
      </main>

      {/* 푸터 */}
      <footer className="footer-print">
        <div className="footer-content">
          <div className="receipt-illustration">
            <span className="receipt-text">Every moment is worth printing.</span>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} MoPrint. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 일기 상세 모달 */}
      {selectedDiary && (
        <DiaryDetailModal
          diary={selectedDiary}
          onClose={() => setSelectedDiary(null)}
        />
      )}
    </>
  );
}
