import { supabase } from '../lib/supabaseClient';

/**
 * Supabase DB에서 전체 일기 목록을 가져옵니다. (최신순)
 * @returns {Promise<Array>} 일기 객체 리스트
 */
export const loadDiaries = async () => {
  const { data, error } = await supabase
    .from('diaries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('일기를 불러오는 도중 에러가 발생했습니다:', error);
    return [];
  }
  return data;
};

/**
 * Supabase DB에 새 일기를 저장합니다.
 * @param {Object} diary - 저장할 일기 객체
 * @returns {Promise<Object|null>} 저장된 일기 객체
 */
export const addDiary = async (diary) => {
  const { data, error } = await supabase
    .from('diaries')
    .insert([diary])
    .select()
    .single();

  if (error) {
    console.error('일기를 저장하는 도중 에러가 발생했습니다:', error);
    throw new Error('일기를 저장할 수 없습니다.', { cause: error });
  }
  return data;
};

/**
 * Supabase DB에서 특정 일기를 삭제합니다.
 * @param {string} id - 삭제할 일기의 UUID
 */
export const deleteDiary = async (id) => {
  const { error } = await supabase
    .from('diaries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('일기를 삭제하는 도중 에러가 발생했습니다:', error);
    throw new Error('일기를 삭제할 수 없습니다.', { cause: error });
  }
};
