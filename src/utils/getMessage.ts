import { MESSAGES } from "../constants";

export const getMessage = (score: number) => {
  if (score === 0) {
    return MESSAGES.FIRST_WORD;
  } else if (score === 1) {
    return MESSAGES.SECOND_WORD;
  } else if (score === 2) {
    return MESSAGES.THIRD_WORD;
  }
};
