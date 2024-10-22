import { useEffect, useState } from "react";
import { getWord } from "../../api";

export const useRowTower = () => {
  const [numOfRows, setNumOfRows] = useState(1);
  const [words, setWords] = useState(new Set());
  const [lastWord, setLastWord] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  const addToSet = (word: string) => {
    // Create a new Set instance to avoid mutating state directly
    const newSet = new Set(words);
    newSet.add(word);
    setWords(newSet);
  };

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [numOfRows]);

  const handleRowFilled = async (word: string) => {
    if (words.has(word)) {
      setError("You already used this word!");
      return;
    }

    if (lastWord) {
      let diffCount = 0;
      for (let i = 0; i < lastWord.length; i++) {
        if (word[i] !== lastWord[i]) {
          diffCount++;
          if (diffCount > 1) {
            setError("There must be at most 1 different letter");
            return;
          }
        }
      }
    }

    const valid = await getWord(word);
    if (valid) {
      addToSet(word);
      setLastWord(word);
      setNumOfRows((num) => num + 1);
    } else {
      setError("Not a real word!");
    }
  };

  const clearError = () => {
    if (error) {
      setError(undefined);
    }
  };

  return {
    error,
    clearError,
    numOfRows,
    handleRowFilled,
  };
};
