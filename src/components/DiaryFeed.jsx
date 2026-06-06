import { useState } from 'react';

const COLOR_MAP = {
  pink: '#ffb7b2',
  teal: '#b5ead7',
  lavender: '#c7ceea',
  peach: '#ffdac1',
  ochre: '#ffebd3',
};

export default function DiaryFeed({ diaries, onDeleteDiary, onSelectDiary }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiaries = diaries.filter((diary) => {
    const term = searchTerm.toLowerCase();
    return (
      diary.title.toLowerCase().includes(term) ||
      diary.content.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      {/* 검색 바 영역 */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="🔍 제목 또는 내용으로 기록 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: '400px' }}
        />
      </div>

      {filteredDiaries.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📝</span>
          <h3 className="empty-title">
            {searchTerm ? '검색 결과에 맞는 일기가 없습니다.' : '아직 보관된 순간이 없습니다.'}
          </h3>
          <p className="empty-text">
            {searchTerm
              ? '다른 키워드로 검색해 보세요!'
              : '새로운 일기를 써서 나만의 소중한 폴라로이드를 인쇄해 보세요.'}
          </p>
        </div>
      ) : (
        <div className="diary-feed">
          {filteredDiaries.map((diary) => {
            const cardColor = COLOR_MAP[diary.color] || COLOR_MAP.pink;
            return (
              <div
                key={diary.id}
                className="diary-card-polaroid"
                style={{ backgroundColor: cardColor }}
              >
                {/* 왼쪽: 폴라로이드 사진 프레임 */}
                <div 
                  className="polaroid-frame"
                  onClick={() => onSelectDiary(diary)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="polaroid-image-container">
                    {diary.image_url ? (
                      <img
                        src={diary.image_url}
                        alt={diary.title}
                        className="polaroid-image"
                        loading="lazy"
                      />
                    ) : (
                      <span className="polaroid-placeholder">🖼️</span>
                    )}
                  </div>
                  <div className="polaroid-caption">
                    {diary.date.replace(/-/g, '.')}
                  </div>
                </div>

                {/* 오른쪽: 상세 설명 */}
                <div className="diary-card-details">
                  <div>
                    <div className="diary-card-header">
                      <span className="diary-stamp-date">
                        📍 {diary.date.replace(/-/g, '.')}
                      </span>
                      <span className="diary-visibility-badge">
                        {diary.visibility === 'private' ? '🔒 Private' : '👥 Group'}
                      </span>
                    </div>
                    <h3 
                      className="diary-card-title"
                      onClick={() => onSelectDiary(diary)}
                      style={{ cursor: 'pointer' }}
                    >
                      {diary.title}
                    </h3>
                    <p className="diary-card-content">{diary.content}</p>
                  </div>

                  <div className="diary-card-actions">
                    <button
                      className="diary-action-link"
                      onClick={() => onSelectDiary(diary)}
                    >
                      상세히 읽기 🔍
                    </button>
                    <button
                      className="diary-action-link diary-delete-btn"
                      onClick={() => {
                        if (window.confirm('이 소중한 기억을 정말 삭제할까요?')) {
                          onDeleteDiary(diary.id);
                        }
                      }}
                    >
                      삭제하기 🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
