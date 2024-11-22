import { getSavedWord, addSavedWord } from "./utils";

export const getWord = async (word: string) => {
  const savedWord = getSavedWord(word);
  if (savedWord) {
    return savedWord;
  }

  try {
    const response = await fetch(
      `https://475yg524rl.execute-api.us-east-2.amazonaws.com/prod/check?word=${word}`
    );

    const body: string = await response.json();

    addSavedWord(word, body);

    return body;
  } catch (error) {
    return "ERROR";
  }
};
