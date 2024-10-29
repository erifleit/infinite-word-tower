export const BOX_WIDTH = 40;
export const BORDER_RADIUS = 8;
export const MARGIN = 4;
export const GREEN = "#bcffbc";
export const LIGHT_GREEN = "#deffde";
export const RED = "red";
export const LIGHT_RED = "#ffbcbc";

export enum MESSAGES {
  FIRST_WORD = "Start by typing a 5 letter word!",
  SECOND_WORD = "Now input another 5 letter word, but you can only change 1 letter!",
  SECOND_WORD_FIRST_TIME = "Input another 5 letter word, but you can only change 1 letter!",
  THIRD_WORD = "You got it! Now keep going!",
  LOADING = "Checking 🧐",
}

export enum ERRORS {
  NOT_REAL = "Not a real word!",
  ALREADY_USED = "You already used this word!",
  MUST_HAVE_DIFFERENT = "There must be at most 1 different letter",
}
