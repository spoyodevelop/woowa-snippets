import MESSAGES from '../Settings/Messages.js';
import OutputView from '../View/OutputView.js';

function checkCrewAreDuplicated(crews) {
  return new Set(crews).size === crews.length;
}
function checkCrewAreAllHaveLegitName(crews) {
  return !crews.some((crew) => crew.length > 5);
}
function checkCrewSize(crews) {
  return crews.length >= 5 && crews.length <= 35;
}

export default async function validateCrews(inputString) {
  if (!inputString.includes(',')) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_PATTERN);
    return null;
  }
  const crews = inputString.split(',');
  if (!checkCrewSize(crews)) {
    OutputView.printMessage(MESSAGES.error.NOT_LEGIT_SIZE);
    return null;
  }
  if (!checkCrewAreDuplicated(crews)) {
    OutputView.printMessage(MESSAGES.error.DUPLICATED_CREW);
    return null;
  }
  if (!checkCrewAreAllHaveLegitName(crews)) {
    OutputView.printMessage(MESSAGES.error.TOO_LONG_NAME);
    return null;
  }
  return crews;
}
