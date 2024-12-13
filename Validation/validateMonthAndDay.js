import OutputView from '../View/OutputView.js';
import MESSAGES from '../Settings/Messages.js';

// 입력된 월(month)이 1~12 사이의 유효한 값인지 확인하는 함수
function checkAvailableMonth(month) {
  const parsedMonth = Number(month);

  // 월이 숫자인지 확인하고, 1~12 범위 내에 있는지 검증
  if (Number.isNaN(parsedMonth)) return false;
  return parsedMonth >= 1 && parsedMonth <= 12;
}

// 입력된 요일(day)이 유효한 요일인지 확인하는 함수
function checkAvailableDay(day) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  // 요일 배열에 입력값이 포함되어 있는지 확인
  return days.includes(day);
}

// 월과 요일을 검증하는 메인 함수
export default function validateMonthAndDay(inputString) {
  // 입력값에 콤마(,)가 포함되어 있는지 확인
  if (!inputString.includes(',')) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_PATTERN); // 패턴 오류 메시지 출력
    return null;
  }

  // 입력값을 콤마(,)로 분리하여 월(month)와 요일(day)로 나눔
  const [month, day] = inputString.split(',');

  // 월(month) 값이 유효한 범위인지 확인
  if (!checkAvailableMonth(month)) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_MONTH); // 유효하지 않은 월 에러 메시지 출력
    return null;
  }

  // 요일(day) 값이 유효한 요일인지 확인
  if (!checkAvailableDay(day)) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_DAY); // 유효하지 않은 요일 에러 메시지 출력
    return null;
  }

  // 검증이 완료되면 유효한 월과 요일 객체를 반환
  return { month: +month, day };
}
