import { create } from "zustand";
import { ERRORS, MESSAGES } from "../constants";
import {
  updateWord,
  getBestScore,
  updateLocalStorageBestScore,
} from "../utils";

export type GameState = {
  bestScore: number;
  currentWord: string;
  displayMessage: boolean;
  error?: ERRORS;
  message?: MESSAGES;
  score: number;
  words: string[];
  addWord: () => void;
  handleKeyPress: (key: string) => void;
  setError: (error?: ERRORS) => void;
  setMessage: (message?: MESSAGES) => void;
  setScore: (score: number) => void;
  setStarterWord: (word: string) => void;
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

  // Actions
  addWord: () =>
    set(({ words, currentWord, bestScore }) => {
      const updatedScore = words.length + 1;
      if (updatedScore > bestScore) {
        updateLocalStorageBestScore(updatedScore);
      }
      window.scrollTo(0, document.body.scrollHeight);
      return {
        words: [...words, currentWord],
        score: updatedScore,
        currentWord: "",
        bestScore: Math.max(updatedScore, bestScore),
        displayMessage: false,
        message: undefined,
      };
    }),

  setStarterWord: (word) =>
    set(({ score }) => ({ words: [word], score: score + 1 })),

  handleKeyPress: (key) => {
    console.log("handleKeyPress everywhere!");
    set(({ currentWord, error }) => ({
      currentWord: updateWord(currentWord, key),
      error: key === "Backspace" ? undefined : error,
    }));
  },

  setError: (error) =>
    set(({ message }) => ({
      error,
      message: error ? undefined : message,
      displayMessage: !error,
    })),

  setMessage: (message) => set({ message, displayMessage: !!message }),
  setScore: (score) => set({ score }),
}));
