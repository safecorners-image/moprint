const DIARIES_KEY = 'moprint_diaries';
const GROUPS_KEY = 'moprint_groups';

/**
 * 로컬 스토리지에서 전체 일기 목록을 가져옵니다.
 * @returns {Array} 일기 객체 리스트
 */
export const loadDiaries = () => {
  try {
    const rawData = localStorage.getItem(DIARIES_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    console.error('일기를 불러오는 도중 에러가 발생했습니다:', error);
    return [];
  }
};

/**
 * 로컬 스토리지에 전체 일기 목록을 저장합니다.
 * @param {Array} diaries - 저장할 일기 목록
 */
export const saveDiaries = (diaries) => {
  try {
    localStorage.setItem(DIARIES_KEY, JSON.stringify(diaries));
  } catch (error) {
    console.error('일기를 저장하는 도중 에러가 발생했습니다:', error);
    throw new Error('용량 초과 등의 이유로 일기를 저장할 수 없습니다.', { cause: error });
  }
};

/**
 * 로컬 스토리지에서 전체 그룹 목록을 가져옵니다.
 * @returns {Array} 그룹 이름 리스트
 */
export const loadGroups = () => {
  try {
    const rawData = localStorage.getItem(GROUPS_KEY);
    return rawData ? JSON.parse(rawData) : []; // 기본은 빈 배열 (깨끗한 빈 상태 시작)
  } catch (error) {
    console.error('그룹 목록을 불러오는 도중 에러가 발생했습니다:', error);
    return [];
  }
};

/**
 * 로컬 스토리지에 전체 그룹 목록을 저장합니다.
 * @param {Array} groups - 저장할 그룹 이름 목록
 */
export const saveGroups = (groups) => {
  try {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  } catch (error) {
    console.error('그룹 목록을 저장하는 도중 에러가 발생했습니다:', error);
  }
};
