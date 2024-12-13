import { Console } from '@woowacourse/mission-utils';

export default async function validateUserAgree(message) {
  while (true) {
    const input = await Console.readLineAsync(message);
    const parsedString = input.trim().toUpperCase(); // 입력값을 대소문자 구분 없이 처리

    // 'Y' 또는 'N'이 아닌 값이 입력되면 오류 메시지 출력
    if (parsedString !== 'Y' && parsedString !== 'N') {
      Console.print('[ERROR]: Y 와 N 만 입력 가능합니다.');
      continue; // 잘못된 입력이면 다시 입력을 받기 위해 반복
    }

    // 'Y' 입력 시 true 반환
    if (parsedString === 'Y') return true;

    // 'N' 입력 시 false 반환
    if (parsedString === 'N') return false;
  }
}
