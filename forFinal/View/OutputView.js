import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },
  printOnCall(cal, onCall) {
    let i = 0;
    cal.forEach((date) => {
      Console.print(`${date.toString()} ${onCall[i]}`);
      i++;
    });
  },
};

export default OutputView;
