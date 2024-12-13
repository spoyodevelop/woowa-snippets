import { ERROR_MESSAGES } from '../config/defaultSettings.js';
import { isNumber } from '../Utility/regex.js';
import OutputView from '../src/OutputView.js';
import ShoppingItem from '../src/ShoppingItem.js';

// 주문 항목 형식이 유효한지 확인하는 함수
function isValidFormat(item) {
  const [name, quantity] = item.split('-');
  // 이름과 수량이 존재하며 수량이 숫자인지 확인
  return name && !Number.isNaN(quantity);
}

// 주문 항목을 이름과 수량으로 분리하고, 수량은 숫자로 변환하는 함수
function parseItem(item) {
  const [name, quantity] = item.split('-');
  return { name, quantity: Number(quantity) };
}

// 수량이 유효한지 확인하는 함수
function isValidQuantity(quantity) {
  return isNumber.test(quantity) && Number(quantity) > 0;
}

// 제품이 유효한지 확인하는 함수 (제품 목록에 이름이 존재하는지)
function isValidProduct(name, products) {
  return products.some((product) => product.name === name);
}

export default function validateShoppingCart(inputString, products) {
  // 입력값에서 각 항목을 구분하고 공백을 제거하여 배열로 만듦
  const items = inputString.includes(',')
    ? inputString.split(',').map((item) => item.trim()) // 콤마가 있을 경우 분리
    : [inputString.trim()]; // 하나의 항목만 있을 경우 배열로 감싸기

  const shoppingItems = [];

  // 각 항목에 대해 유효성 검사 수행
  for (const item of items) {
    // 형식이 올바르지 않으면 에러 메시지를 출력하고 종료
    if (!isValidFormat(item)) {
      OutputView.printMessage(
        `[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
      );
      return null;
    }

    const { name, quantity } = parseItem(item);

    // 수량이 유효하지 않으면 에러 메시지를 출력하고 종료
    if (!isValidQuantity(quantity)) {
      OutputView.printMessage(
        `[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
      );
      return null;
    }

    // 제품이 목록에 없으면 에러 메시지를 출력하고 종료
    if (!isValidProduct(name, products)) {
      OutputView.printMessage(`${ERROR_MESSAGES.ITEM_NOT_FOUND}`);
      return null;
    }

    // 제품 정보에 맞는 항목을 찾아 가격과 카테고리를 가져옴
    const matchedProduct = products.find((item) => item.name == name);
    const { name: itemName, price, category } = matchedProduct;

    // ShoppingItem 객체를 배열에 추가
    shoppingItems.push(new ShoppingItem(itemName, quantity, price, category));
  }

  // 중복된 제품이 있는지 확인
  const uniqueNames = new Set(shoppingItems.map((item) => item.name));
  if (uniqueNames.size !== shoppingItems.length) {
    OutputView.printMessage(
      '[ERROR] 중복된 주문을 입력했습니다. 다시 입력해 주시겠어요?',
    );
    return null;
  }

  // 주문한 총 제품 수가 20개 이상이면 에러 메시지를 출력하고 종료
  const allProductSize = shoppingItems.reduce(
    (acc, { quantity }) => acc + quantity,
    0,
  );
  if (allProductSize > 20) {
    OutputView.printMessage('[ERROR] 20개 이상의 주문을 받을수 없습니다.');
    return null;
  }

  // 모든 제품이 음료인 경우 주문을 받을 수 없다는 에러 메시지를 출력
  const isAllProductDrink = shoppingItems.every(
    (item) => item.category === '음료',
  );
  if (isAllProductDrink) {
    OutputView.printMessage('[ERROR] 음료만 주문으로 받을수는 없습니다.');
    return null;
  }

  // 유효한 주문이 있다면 그 목록을 반환, 그렇지 않으면 null을 반환
  return shoppingItems.length > 0 ? shoppingItems : null;
}
