import { useEffect, useMemo } from "react";
import { getWord } from "../../api";
import { isMobile } from "react-device-detect";
import { useGameStore, useModalState } from "../../store";
import { getMessage, getQueryParam } from "../../utils";
import { ERRORS, MESSAGES } from "../../constants";

export const useTower = () => {
  const {
    words,
    setWords,
    currentWord,
    setCurrentWord,
    error,
    setError,
    setMessage,
    setDisplayMessage,
  } = useGameStore();

  const { isModalOpen } = useModalState();

  const lastWord = useMemo(() => words[words.length - 1], [words]);

  useEffect(() => {
    const starterWord = getQueryParam();
    if (starterWord) {
      setWords([starterWord]);
      setCurrentWord("");
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
      if (key === "Backspace" && currentWord.length) {
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
  }, [error, currentWord, setCurrentWord, setError, isModalOpen]);

  useEffect(() => {
    const handleRowFilled = async (word: string) => {
      if (words.includes(word)) {
        setError(ERRORS.ALREADY_USED);
        setDisplayMessage(false);
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

      const valid = await getWord(word);
      if (valid) {
        setWords([...words, word]);
        setCurrentWord("");
        window.scrollTo(0, document.body.scrollHeight);
        setDisplayMessage(false);
      } else {
        setError(ERRORS.NOT_REAL);
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
    setCurrentWord,
    setError,
    setDisplayMessage,
    setWords,
    words,
    setMessage,
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

  return {
    words: [...words, currentWord],
    error,
  };
};
