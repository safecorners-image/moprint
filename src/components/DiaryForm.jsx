import { useState } from 'react';
import { compressImage } from '../utils/imageCompressor';

// 기분 별 파스텔 색상 정의
const COLOR_OPTIONS = [
  { name: 'pink', label: '😊 기쁜', hex: '#ffb7b2' },
  { name: 'teal', label: '🌿 차분한', hex: '#b5ead7' },
  { name: 'lavender', label: '🔮 감성적인', hex: '#c7ceea' },
  { name: 'peach', label: '🍑 포근한', hex: '#ffdac1' },
  { name: 'ochre', label: '🌻 활기찬', hex: '#ffebd3' },
];

export default function DiaryForm({ onAddDiary, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [image, setImage] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('pink');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCompressing(true);
    try {
      // HTML Canvas 기반 리사이징 및 압축 실행
      const compressedDataUrl = await compressImage(file, 800, 800, 0.7);
      setImage(compressedDataUrl);
    } catch (error) {
      alert('이미지 압축에 실패했습니다. 다시 시도해 주세요.');
      console.error(error);
    } finally {
      setCompressing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 작성해 주세요.');
      return;
    }

    onAddDiary({
      title: title.trim(),
      content: content.trim(),
      date,
      image,
      color: selectedColor,
      visibility: 'private', // 1단계는 나만 보기 고정
    });

    // 폼 초기화
    setTitle('');
    setContent('');
    setImage(null);
    setSelectedColor('pink');
  };

  return (
    <div className="diary-form-container">
      <h2 className="diary-form-title">
        <span>📸</span> 새로운 순간 인쇄하기 (Private)
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* 입력 필드 영역 */}
          <div>
            <div className="form-group">
              <label className="form-label">일기 제목</label>
              <input
                type="text"
                className="form-input"
                placeholder="오늘 하루는 어땠나요?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">기록 날짜</label>
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">오늘의 분위기 색상</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    style={{
                      backgroundColor: color.hex,
                      border: selectedColor === color.name ? '2px solid #1a1a24' : '1px solid #e5e0d0',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      color: '#1a1a24',
                      transform: selectedColor === color.name ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => setSelectedColor(color.name)}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">공개 범위 설정</label>
              <select className="form-input" disabled value="private">
                <option value="private">🔒 나만 보기 (Private)</option>
              </select>
            </div>
          </div>

          {/* 사진 업로드 및 미리보기 영역 */}
          <div>
            <div className="form-group">
              <label className="form-label">사진 첨부</label>
              <input
                type="file"
                id="file-upload"
                className="form-input-file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label htmlFor="file-upload" className="file-upload-trigger">
                <span className="file-upload-icon">📷</span>
                <span className="file-upload-text">
                  {compressing ? '이미지 압축 중...' : '기기에서 사진 불러오기'}
                </span>
              </label>
            </div>

            {/* 실시간 폴라로이드 미리보기 */}
            <div className="form-preview-container">
              <div 
                className="preview-polaroid"
                style={{ 
                  backgroundColor: COLOR_OPTIONS.find(c => c.name === selectedColor)?.hex 
                }}
              >
                <div className="polaroid-image-container">
                  {image ? (
                    <img src={image} alt="Preview" className="preview-polaroid-img" />
                  ) : (
                    <span className="polaroid-placeholder">🖼️</span>
                  )}
                </div>
                <div style={{
                  fontFamily: 'Quicksand, Gowun Dodum',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#7a7a85',
                  textAlign: 'center',
                  marginTop: '12px',
                  letterSpacing: '1px'
                }}>
                  {date.replace(/-/g, '.')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '16px' }}>
          <label className="form-label">일기 내용</label>
          <textarea
            className="form-textarea"
            placeholder="이 순간을 기억할 수 있도록 진솔하게 적어보세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={onCancel}>
            작성 취소
          </button>
          <button type="submit" className="button-primary" disabled={compressing}>
            📄 순간 인쇄하기
          </button>
        </div>
      </form>
    </div>
  );
}
