import { create } from "zustand";
import { ERRORS, MESSAGES } from "../constants";

export type GameState = {
  words: string[];
  addWord: () => void;
  setStarterWord: (word: string) => void;
  currentWord: string;
  setCurrentWord: (word: string) => void;
  error?: ERRORS;
  setError: (error?: ERRORS) => void;
  displayMessage: boolean;
  setDisplayMessage: (loading: boolean) => void;
  message?: MESSAGES;
  setMessage: (message?: MESSAGES) => void;
  score: number;
  setScore: (score: number) => void;
  bestScore: number;
  failedWords: string[];
  addFailedWord: (word: string) => void;
};

const getBestScore = () => {
  const savedScore = localStorage.getItem("bestScore");
  return savedScore ? JSON.parse(savedScore) : 0;
};

const updateLocalStorageBestScore = (score: number) => {
  localStorage.setItem("bestScore", JSON.stringify(score));
};

export const useGameStore = create<GameState>((set) => ({
  // Initial states
  words: [],
  currentWord: "",
  error: undefined,
  displayMessage: false,
  message: undefined,
  score: 0,
  bestScore: getBestScore(),
  failedWords: [],

  // Actions
  addWord: () =>
    set(({ words, currentWord, bestScore }) => {
      const updatedScore = words.length + 1;
      if (updatedScore > bestScore) {
        updateLocalStorageBestScore(updatedScore);
      }
      console.log({ updatedScore, bestScore });
      return {
        words: [...words, currentWord],
        score: updatedScore,
        currentWord: "",
        bestScore: Math.max(updatedScore, bestScore),
      };
    }),

  setStarterWord: (word) =>
    set(({ score }) => ({ words: [word], score: score + 1 })),

  setCurrentWord: (word) => {
    if (word.length <= 5) {
      set({ currentWord: word });
    }
  },

  setError: (error) =>
    set(({ message }) => ({
      error,
      message: error ? undefined : message,
      displayMessage: !error,
    })),

  setDisplayMessage: (displayMessage) =>
    set(
      displayMessage
        ? { displayMessage }
        : { displayMessage, message: undefined }
    ),
  setMessage: (message) => set({ message }),
  setScore: (score) => set({ score }),
  addFailedWord: (word) =>
    set(({ failedWords }) => ({ failedWords: [...failedWords, word] })),
}));
