const movementValidation = {
  // 사용자가 입력한 이동 방향을 검증하는 함수
  validate(input) {
    // 입력값이 'U' 또는 'D'인지 확인
    if (input !== 'U' && input !== 'D') {
      throw new Error('[ERROR]: U 와 D 중 하나를 입력해주세요.'); // 유효하지 않은 경우 에러를 발생
    }

    // 유효한 입력값 반환
    return input;
  },
};

export default movementValidation;
