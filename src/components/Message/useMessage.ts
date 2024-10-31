import { useMemo } from "react";
import { useGameStore } from "../../store";
import { MESSAGES, ERRORS } from "../../constants";
import { getWord } from "../../api";

export const useMessage = () => {
  const {
    message,
    displayMessage,
    error,
    currentWord,
    addWord,
    setCurrentWord,
    setDisplayMessage,
    setError,
    setMessage,
  } = useGameStore();

  const content = useMemo(() => error || message, [error, message]);

  const tryAgain = async () => {
    setError(undefined);
    setDisplayMessage(true);
    setMessage(MESSAGES.LOADING);
    const response = await getWord(currentWord);
    if (response === "VALID_WORD") {
      addWord();
      setCurrentWord("");
      window.scrollTo(0, document.body.scrollHeight);
      setDisplayMessage(false);
    } else {
      if (response === "INVALID_WORD") {
        setError(ERRORS.NOT_REAL);
      } else {
        setError(ERRORS.ERROR_CHECKING);
      }
    }
  };

  return {
    displayMessage,
    content,
    tryAgain,
    error,
  };
};
