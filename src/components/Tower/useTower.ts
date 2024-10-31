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
    setCurrentWord,
    error,
    setError,
    setMessage,
    setDisplayMessage,
    message,
    addFailedWord,
    failedWords,
    setStarterWord,
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
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isModalOpen) return;
      const key = event.key;

      // Detect alphabetic characters (a-z)
      if (/^[a-zA-Z]$/.test(key) && currentWord.length < 5) {
        setCurrentWord(`${currentWord}${key.toUpperCase()}`);
      }

      // Detect backspace key
      if (
        key === "Backspace" &&
        currentWord.length &&
        message !== MESSAGES.LOADING
      ) {
        console.log("hello");
        setCurrentWord(currentWord.slice(0, currentWord.length - 1));
        if (error) {
          setError(undefined);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [error, currentWord, setCurrentWord, setError, isModalOpen, message]);

  useEffect(() => {
    const handleRowFilled = async (word: string) => {
      if (words.includes(word)) {
        setError(ERRORS.ALREADY_USED);
        return;
      }

      // this prevents spamming the same word repeatedly - could try saving this in local storage
      if (failedWords.includes(word)) {
        setError(ERRORS.NOT_REAL);
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
        window.scrollTo(0, document.body.scrollHeight);
        setDisplayMessage(false);
      } else {
        if (response === RESPONSES.INVALID) {
          setError(ERRORS.NOT_REAL);
          addFailedWord(word);
        } else {
          setError(ERRORS.ERROR_CHECKING);
        }
      }
    };
    if (currentWord.length === 5) {
      setDisplayMessage(true);
      setMessage(MESSAGES.LOADING);
      handleRowFilled(currentWord);
    }
  }, [
    currentWord,
    lastWord,
    setError,
    setDisplayMessage,
    addWord,
    words,
    setMessage,
    addFailedWord,
    failedWords,
  ]);

  useEffect(() => {
    const message = getMessage(words.length);

    if (message) {
      setDisplayMessage(true);
      setMessage(message);
    }

    if (!isMobile) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [setDisplayMessage, setMessage, words, error]);

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
