import { useEffect, useState } from "react";
import { useGameStore, useUIState } from "../../store";

export const useHeader = () => {
  const [bestScore, setBestScore] = useState<number>(() => {
    const savedScore = localStorage.getItem("bestScore");
    return savedScore ? JSON.parse(savedScore) : 0;
  });

  const { words } = useGameStore();
  const { openModal, setKeyboardVisible, keyboardVisible } = useUIState();

  useEffect(() => {
    if (words.length > bestScore) {
      setBestScore(words.length);
      localStorage.setItem("bestScore", JSON.stringify(words.length));
    }
  }, [words, bestScore]);

  const showKeyboard = () => {
    setKeyboardVisible(true);
  };

  const hideKeyboard = () => {
    setKeyboardVisible(false);
  };

  return {
    score: words.length,
    bestScore,
    openModal,
    showKeyboard,
    hideKeyboard,
    keyboardVisible,
  };
};
