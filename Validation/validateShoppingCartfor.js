import OutputView from '../View/OutputView.js';

// 여러 개의 아이템을 처리하는 함수. 각 아이템은 괄호로 묶여 있고 '아이템명-수량' 형식
function parseMultipleItems(parseString) {
  return parseString.map((str) => str.slice(1, str.length - 1).split('-')); // 첫 번째, 마지막 문자(괄호)를 제외하고 '-'로 구분
}

// 제품이 존재하는지 확인하는 함수
function checkProductAvailable(name, products) {
  const allAvailableProducts = products.map((product) => product.name);
  return allAvailableProducts.includes(name); // 제품명이 존재하면 true 반환
}

// 구매하려는 수량이 재고 수량을 초과하지 않는지 확인하는 함수
function checkAvailableQuantity(name, quantity, products) {
  const allAvailableQuantity = products
    .filter((product) => product.name === name) // 해당 제품만 필터링
    .map((product) => product.quantity) // 제품의 수량만 추출
    .reduce((partialSum, a) => partialSum + a, 0); // 총 수량을 합산

  return allAvailableQuantity >= quantity; // 재고 수량이 부족하지 않으면 true 반환
}

export default function validateShoppingCart(inputString, products) {
  let parseString = inputString; // 입력된 문자열을 저장할 변수
  let shoppingCart = []; // 최종적으로 처리된 쇼핑카트 배열
  const resultCart = []; // 유효성 검사를 통과한 결과만 저장할 배열

  // 입력값이 올바른 괄호 형식인지 검사
  if (!inputString.startsWith('[') || !inputString.includes(']')) {
    OutputView.printMessage('[ERROR]: 괄호식이 올바르지 않습니다.');
    return null;
  }

  // 입력값에 ','가 포함되지 않으면 단일 아이템 처리
  if (!inputString.includes(',')) {
    shoppingCart.push(parseString.slice(1, parseString.length - 1).split('-'));
  }

  // 입력값에 ','가 포함되면 여러 아이템 처리
  if (inputString.includes(',')) {
    parseString = parseString.split(',');
    shoppingCart = parseMultipleItems(parseString);
  }

  // 쇼핑카트의 각 아이템에 대해 유효성 검사
  for (const shoppingItem of shoppingCart) {
    const [itemName, quantity] = shoppingItem;

    // 수량이 숫자가 아니거나 음수일 경우 에러 처리
    if (Number.isNaN(Number(quantity)) || Number(quantity) <= 0) {
      OutputView.printMessage(
        '[ERROR] 숫자가 올바르지 않습니다. 음수는 입력되지 않습니다.',
      );
      return null;
    }

    // 제품이 목록에 존재하는지 검사
    if (!checkProductAvailable(itemName, products)) {
      OutputView.printMessage(
        '[ERROR] 존재하지 않는 아이템을 입력했습니다. 다시 입력해 주세요.',
      );
      return null;
    }

    // 재고 수량이 부족한지 검사
    if (!checkAvailableQuantity(itemName, +quantity, products)) {
      OutputView.printMessage(
        '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
      );
      return null;
    }

    // 유효한 항목만 결과 배열에 추가
    resultCart.push({ itemName, quantity: +quantity });
  }

  // 유효한 쇼핑카트 항목 반환
  return resultCart;
}
