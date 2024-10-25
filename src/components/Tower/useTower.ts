import { useContext, useEffect, useMemo } from "react";
import { getWord } from "../../api";
import { isMobile } from "react-device-detect";
import { GameContext } from "../../context/GameContext";

export const useTower = () => {
  const {
    words,
    setWords,
    currentWord,
    setCurrentWord,
    error,
    setError,
    loading,
    setLoading,
  } = useContext(GameContext);

  const lastWord = useMemo(() => words[words.length - 1], [words]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      // Detect alphabetic characters (a-z)
      if (/^[a-zA-Z]$/.test(key) && currentWord.length < 5) {
        // console.log(`Alphabetic key pressed: ${key}`);
        setCurrentWord((word) => `${word}${key.toUpperCase()}`);
      }

      // Detect backspace key
      if (key === "Backspace" && currentWord.length) {
        // console.log("Backspace pressed");
        setCurrentWord((word) => word.slice(0, word.length - 1));
        if (error) setError(undefined);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [error, currentWord, setCurrentWord, setError]);

  useEffect(() => {
    const handleRowFilled = async (word: string) => {
      if (words.includes(word)) {
        setError("You already used this word!");
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
          setError("There must be at most 1 different letter");
          return;
        }
      }

      const valid = await getWord(word);
      if (valid) {
        setWords((words) => [...words, word]);
        setCurrentWord("");
      } else {
        setError("Not a real word!");
      }
    };
    if (currentWord.length === 5) {
      setLoading(true);
      handleRowFilled(currentWord).then(() => setLoading(false));
    }
  }, [
    currentWord,
    lastWord,
    setCurrentWord,
    setError,
    setLoading,
    setWords,
    words,
  ]);

  useEffect(() => {
    if (!isMobile) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [words]);

  return {
    loading,
    words: [...words, currentWord],
    error,
  };
};
