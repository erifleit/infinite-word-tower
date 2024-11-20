import { useEffect, useMemo } from "react";
import { getWord } from "../../api";
import { isMobile } from "react-device-detect";
import { useGameStore, useUIState } from "../../store";
import { getMessage, getQueryParam } from "../../utils";
import { ERRORS, MESSAGES, RESPONSES } from "../../constants";

export const useTower = () => {
  const {
    words,
    addWord,
    currentWord,
    error,
    setError,
    setMessage,
    message,
    setStarterWord,
    handleKeyPress,
  } = useGameStore();

  const { isModalOpen, keyboardVisible } = useUIState();

  const lastWord = useMemo(() => words[words.length - 1], [words]);

  useEffect(() => {
    const starterWord = getQueryParam();
    if (starterWord) {
      setStarterWord(starterWord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keyPress = (event: KeyboardEvent) => {
      if (isModalOpen || message === MESSAGES.LOADING) {
        return;
      }
      const key = event.key;

      if (/^[a-zA-Z]$/.test(key) || key === "Backspace") {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", keyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, [isModalOpen, message, handleKeyPress]);

  useEffect(() => {
    const handleRowFilled = async (word: string) => {
      if (words.includes(word)) {
        setError(ERRORS.ALREADY_USED);
        return;
      }

      if (lastWord) {
        let diffCount = 0;
        const hasTooManyDifferences = word.split("").some((letter, index) => {
          if (letter !== lastWord[index]) {
            diffCount++;
          }
          return diffCount > 1;
        });

        if (hasTooManyDifferences) {
          setError(ERRORS.MUST_HAVE_DIFFERENT);
          return;
        }
      }

      const response = await getWord(word);
      if (response === RESPONSES.VALID) {
        addWord();
      } else {
        setError(
          response === RESPONSES.INVALID
            ? ERRORS.NOT_REAL
            : ERRORS.ERROR_CHECKING
        );
      }
    };
    if (currentWord.length === 5) {
      setMessage(MESSAGES.LOADING);
      handleRowFilled(currentWord);
    }
  }, [currentWord, lastWord, setError, addWord, words, setMessage]);

  useEffect(() => {
    const message = getMessage(words.length);

    if (message) {
      setMessage(message);
    }

    if (!isMobile) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [setMessage, words, error]);

  useEffect(() => {
    if (keyboardVisible) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [keyboardVisible]);

  return {
    words: [...words, currentWord],
    error,
    keyboardVisible,
  };
};
