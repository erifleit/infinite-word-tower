import { MESSAGES } from "../constants";
import { getQueryParam } from "./getQueryParams";

export const getMessage = (score: number) => {
  if (score === 0) {
    return MESSAGES.FIRST_WORD;
  } else if (score === 1) {
    if (getQueryParam()) {
      return MESSAGES.SECOND_WORD_FIRST_TIME;
    }
    return MESSAGES.SECOND_WORD;
  } else if (score === 2) {
    return MESSAGES.THIRD_WORD;
  }
};
