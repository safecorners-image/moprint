const COLOR_MAP = {
  pink: '#ffb7b2',
  teal: '#b5ead7',
  lavender: '#c7ceea',
  peach: '#ffdac1',
  ochre: '#ffebd3',
};

export default function DiaryDetailModal({ diary, onClose }) {
  if (!diary) return null;

  const cardColor = COLOR_MAP[diary.color] || COLOR_MAP.pink;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>
        <div className="modal-body">
          <div className="modal-photo-section">
            <div className="modal-polaroid" style={{ backgroundColor: cardColor }}>
              {diary.image_url ? (
                <img
                  src={diary.image_url}
                  alt={diary.title}
                  className="modal-polaroid-image"
                />
              ) : (
                <div
                  className="modal-polaroid-image"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '64px',
                    backgroundColor: '#fffaf0',
                  }}
                >
                  🖼️
                </div>
              )}
              <div
                style={{
                  fontFamily: 'Quicksand, Gowun Dodum',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#7a7a85',
                  textAlign: 'center',
                  marginTop: '16px',
                  letterSpacing: '1px',
                }}
              >
                {diary.date.replace(/-/g, '.')}
              </div>
            </div>
          </div>

          <div className="modal-details">
            <div className="modal-meta">
              <span className="diary-stamp-date">
                📍 {diary.date.replace(/-/g, '.')}
              </span>
              <span className="diary-visibility-badge">
                {diary.visibility === 'private' ? '🔒 Private' : '👥 Group'}
              </span>
            </div>
            <h2 className="modal-title">{diary.title}</h2>
            <div className="modal-text">{diary.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
