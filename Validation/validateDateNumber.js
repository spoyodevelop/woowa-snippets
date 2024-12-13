import { ERROR_MESSAGES } from '../config/defaultSettings.js';
import OutputView from '../src/OutputView.js';
import { isNumber } from '../Utility/regex.js';

// 입력값이 숫자인지 확인하는 함수
function isValidNumber(input) {
  return isNumber.test(input); // 정규식을 통해 숫자인지 판별
}

// 입력값을 숫자로 변환하는 함수
function parseNumber(input) {
  return Number(input); // 문자열을 숫자로 변환
}

// 날짜가 1에서 31 사이의 유효한 값인지 확인하는 함수
function isValidDate(input) {
  const parsedInput = Number(input);
  return parsedInput >= 1 && parsedInput <= 31;
}

// 날짜 입력값을 검증하는 함수
export default function validateDateNumber(inputString) {
  // 입력값이 숫자인지 확인
  if (!isValidNumber(inputString)) {
    OutputView.printMessage(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.', // 에러 메시지 출력
    );
    return null;
  }

  // 입력값이 유효한 날짜 범위(1~31)에 있는지 확인
  if (!isValidDate(inputString)) {
    OutputView.printMessage(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.', // 에러 메시지 출력
    );
    return null;
  }

  // 모든 검증을 통과하면 숫자로 변환하여 반환
  return parseNumber(inputString);
}
