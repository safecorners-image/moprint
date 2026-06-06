import { supabase } from '../lib/supabaseClient';

/**
 * 이미지 파일을 Canvas로 압축한 뒤 Supabase Storage에 업로드합니다.
 * @param {File} file - 업로드할 이미지 파일
 * @param {number} maxWidth - 최대 가로 길이 (기본값: 800px)
 * @param {number} maxHeight - 최대 세로 길이 (기본값: 800px)
 * @param {number} quality - 압축 화질 (0.0 ~ 1.0, 기본값: 0.7)
 * @returns {Promise<string|null>} 업로드된 이미지의 공개 URL
 */
export const uploadImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = async () => {
        // 가로/세로 비율 유지하며 리사이징
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // Canvas로 압축
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Canvas → Blob 변환
        canvas.toBlob(async (blob) => {
          if (!blob) {
            reject(new Error('이미지 변환에 실패했습니다.'));
            return;
          }

          // 고유 파일명 생성 (timestamp + 랜덤값)
          const fileName = `diary-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.jpg`;

          // Supabase Storage 업로드
          const { error: uploadError } = await supabase.storage
            .from('diary-images')
            .upload(fileName, blob, {
              contentType: 'image/jpeg',
              upsert: false,
            });

          if (uploadError) {
            reject(uploadError);
            return;
          }

          // 공개 URL 가져오기
          const { data } = supabase.storage
            .from('diary-images')
            .getPublicUrl(fileName);

          resolve(data.publicUrl);
        }, 'image/jpeg', quality);
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};
