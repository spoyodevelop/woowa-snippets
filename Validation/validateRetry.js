// 입력값이 '1' 또는 '2'인지 확인하고, 그에 따라 boolean 값을 반환하는 함수
export default function validateRetry(inputString) {
  // 입력값이 '1' 또는 '2'가 아닐 경우 에러를 던짐
  if (inputString !== '1' && inputString !== '2') {
    throw new Error('[ERROR]: 1과 2만 입력가능합니다.');
  }

  // '1'일 경우 true 반환, 그렇지 않으면 false 반환
  if (inputString === '1') return true;
  return false;
}
