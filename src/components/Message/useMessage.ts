import { useMemo } from "react";
import { useGameStore } from "../../store";
import { MESSAGES, ERRORS, RESPONSES } from "../../constants";
import { getWord } from "../../api";

export const useMessage = () => {
  const {
    message,
    displayMessage,
    error,
    currentWord,
    addWord,
    setError,
    setMessage,
  } = useGameStore();

  const content = useMemo(() => error || message, [error, message]);

  const tryAgain = async () => {
    setError(undefined);
    setMessage(MESSAGES.LOADING);
    const response = await getWord(currentWord);
    if (response === RESPONSES.VALID) {
      addWord();
    } else {
      setError(
        response === RESPONSES.INVALID ? ERRORS.NOT_REAL : ERRORS.ERROR_CHECKING
      );
    }
  };

  return {
    displayMessage,
    content,
    tryAgain,
    error,
  };
};
