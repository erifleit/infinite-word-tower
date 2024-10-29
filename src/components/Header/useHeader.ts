import { useEffect, useState } from "react";
import { useGameStore, useModalState } from "../../store";

export const useHeader = () => {
  const [bestScore, setBestScore] = useState<number>(() => {
    const savedScore = localStorage.getItem("bestScore");
    return savedScore ? JSON.parse(savedScore) : 0;
  });

  const { words } = useGameStore();
  const { openModal } = useModalState();

  useEffect(() => {
    if (words.length > bestScore) {
      setBestScore(words.length);
      localStorage.setItem("bestScore", JSON.stringify(words.length));
    }
  }, [words, bestScore]);

  return {
    score: words.length,
    bestScore,
    openModal,
  };
};
