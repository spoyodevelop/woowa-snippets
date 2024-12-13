// 입력된 숫자가 유효한 숫자인지 확인
function isNumber(parsedNumber) {
  return !Number.isNaN(parsedNumber);
}

// 숫자 배열 내 중복이 있는지 확인
function isNumberDuplicate(numbers) {
  // 입력 배열(numbers)을 숫자 배열로 변환 후, Set으로 중복 제거
  const parsedNumbers = numbers.map(Number);
  const uniqueNumbers = new Set(parsedNumbers);
  // 배열의 길이와 Set의 크기를 비교하여 중복 여부 반환
  return parsedNumbers.length !== uniqueNumbers.size;
}

// 숫자 검증 함수
export default function validateNumber(inputString) {
  // 입력값을 배열로 처리하기 위해 문자열을 분리
  const parsedNumbers = inputString.split('').map(Number);

  // 입력값이 유효한 숫자인지 확인
  if (!isNumber(Number(inputString))) {
    throw new Error('[ERROR]: 숫자가 아닙니다.');
  }

  // 숫자의 범위가 100 ~ 1000 사이인지 확인
  const parsedNumber = Number(inputString);
  if (parsedNumber < 100 || parsedNumber > 1000) {
    throw new Error('[ERROR]: 유효한 범위의 숫자를 입력해주세요.');
  }

  // 숫자의 자릿수가 3자리 초과인지 확인
  if (inputString.length > 3) {
    throw new Error('[ERROR]: 숫자가 3자리를 넘습니다.');
  }

  // 숫자 중복 여부 확인
  if (isNumberDuplicate(parsedNumbers)) {
    throw new Error('[ERROR]: 숫자가 중복됩니다.');
  }

  // 검증 완료된 숫자 배열 반환
  return parsedNumbers;
}
