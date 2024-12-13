import MESSAGES from '../Settings/Messages.js';
import OutputView from '../View/OutputView.js';

// 입력받은 크루 배열에 중복이 있는지 확인하는 함수
function checkCrewAreDuplicated(crews) {
  // Set을 사용해 중복을 제거한 크루의 수와 원래 배열의 길이를 비교
  return new Set(crews).size === crews.length;
}

// 모든 크루의 이름 길이가 유효한지 확인하는 함수 (5자 이하)
function checkCrewAreAllHaveLegitName(crews) {
  return !crews.some((crew) => crew.length > 5);
}

// 크루 수가 5 이상 35 이하인지 확인하는 함수
function checkCrewSize(crews) {
  return crews.length >= 5 && crews.length <= 35;
}

// 입력받은 크루 정보를 검증하는 메인 함수
export default async function validateCrews(inputString) {
  // 입력 문자열에 콤마(,)가 포함되어 있는지 확인
  if (!inputString.includes(',')) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_PATTERN); // 에러 메시지 출력
    return null;
  }

  // 입력 문자열을 콤마 기준으로 분리하여 크루 배열 생성
  const crews = inputString.split(',');

  // 크루 배열의 길이가 유효한지 확인
  if (!checkCrewSize(crews)) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_SIZE);
    return null;
  }

  // 크루 이름에 중복이 있는지 확인
  if (!checkCrewAreDuplicated(crews)) {
    OutputView.printMessage(MESSAGES.error.DUPLICATED_CREW);
    return null;
  }

  // 모든 크루 이름이 5자 이하인지 확인
  if (!checkCrewAreAllHaveLegitName(crews)) {
    OutputView.printMessage(MESSAGES.error.TOO_LONG_NAME);
    return null;
  }

  // 모든 검증을 통과한 크루 배열 반환
  return crews;
}
