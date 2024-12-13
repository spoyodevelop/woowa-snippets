import OutputView from '../View/OutputView.js';
import MESSAGES from '../Settings/Messages.js';

function checkAvailableMonth(month) {
  const parsedMonth = Number(month);

  if (Number.isNaN(parsedMonth)) return false;

  return parsedMonth >= 1 && parsedMonth <= 12;
}
function checkAvailableDay(day) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  if (!days.includes(day)) return false;
  return true;
}

export default function validateMonthAndDay(inputString) {
  if (!inputString.includes(',')) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_PATTERN);
    return null;
  }
  const [month, day] = inputString.split(',');
  if (!checkAvailableMonth(month)) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_MONTH);
    return null;
  }

  if (!checkAvailableDay(day)) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_DAY);
    return null;
  }
  return { month: +month, day };
}
