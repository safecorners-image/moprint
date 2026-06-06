/**
 * HTML Canvas를 사용하여 이미지 파일을 리사이징 및 압축합니다.
 * @param {File} file - 업로드된 이미지 파일
 * @param {number} maxWidth - 최대 가로 길이 (기본값: 800px)
 * @param {number} maxHeight - 최대 세로 길이 (기본값: 800px)
 * @param {number} quality - 이미지 압축 화질 (0.0 ~ 1.0, 기본값: 0.7)
 * @returns {Promise<string>} - 압축된 이미지의 base64 DataURL
 */
export const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
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

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 가로 세로 비율 계산하여 축소 크기 산정
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

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // canvas에서 압축된 JPEG 포맷으로 변환하여 base64 추출
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
