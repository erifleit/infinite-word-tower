import { isAlphabeticCharacter } from "./isAlphabetical";

const STARTER_WORD = "starterWord";

const validateCharacters = (word: string) => {
  return word.split("").every((character) => isAlphabeticCharacter(character));
};

export const getQueryParam = () => {
  const params = new URLSearchParams(window.location.search);
  const starterWord = params.get(STARTER_WORD)?.toUpperCase();
  if (starterWord?.length === 5 && validateCharacters(starterWord)) {
    return starterWord;
  } else {
    return false;
  }
};
