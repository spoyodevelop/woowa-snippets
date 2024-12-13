import { Console } from '@woowacourse/mission-utils';
import validateMonthAndDay from '../Validation/validateMonthAndDay.js';
import validateCrews from '../Validation/validateCrew.js';

const InputView = {
  async getMouthAndDay() {
    const input = await Console.readLineAsync(
      '비상 근무를 배정할 월과 시작 요일을 입력하세요>',
    );
    const monthAndDay = validateMonthAndDay(input);
    return monthAndDay;
  },
  async getNormalCrews() {
    const input = await Console.readLineAsync(
      '평일 비상 근무 순번대로 사원 닉네임을 입력하세요>',
    );
    const normalCrews = validateCrews(input);
    return normalCrews;
  },
  async getHoliDayCrews() {
    const input = await Console.readLineAsync(
      '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요>',
    );
    const holidayCrews = validateCrews(input);
    return holidayCrews;
  },

  async getInputs() {
    while (true) {
      const monthAndDay = await this.getMouthAndDay();
      if (!monthAndDay) continue;
      const normalCrews = await this.getNormalCrews();
      if (!normalCrews) continue;
      const holidayCrews = await this.getHoliDayCrews();
      if (!holidayCrews) continue;
      return { monthAndDay, normalCrews, holidayCrews };
    }
  },
};

export default InputView;
