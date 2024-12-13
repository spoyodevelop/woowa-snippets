const bridgeLengthValidation = {
  // 다리 길이를 검증하는 함수
  validate(bridgeLength) {
    const parsedLength = Number(bridgeLength);

    // 입력값이 숫자인지 확인
    if (Number.isNaN(parsedLength)) {
      throw new Error('[ERROR]: 다리의 길이는 숫자여야 합니다.');
    }

    // 입력값이 3 이상 20 이하인지 확인
    if (parsedLength < 3 || parsedLength > 20) {
      throw new Error('[ERROR]: 숫자는 3에서 20사이의 숫자여야합니다.');
    }

    // 유효한 숫자를 반환
    return parsedLength;
  },
};

export default bridgeLengthValidation;
