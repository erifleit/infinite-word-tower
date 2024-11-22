import { create } from "zustand";
import { ERRORS, MESSAGES } from "../constants";
import {
  updateWord,
  getBestScore,
  updateLocalStorageBestScore,
} from "../utils";

function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr.toUpperCase() + str.substring(index + 1);
}

export type GameState = {
  bestScore: number;
  currentWord: string;
  displayMessage: boolean;
  error?: ERRORS;
  message?: MESSAGES;
  score: number;
  words: string[];
  selectedBox?: number;
  setSelectedBox: (index?: number) => void;
  moveSelectedBox: (key: string) => undefined | number;
  handleAddNewKey: (key: string) => void;
  addWord: () => void;
  handleKeyPress: (key: string) => void;
  setError: (error?: ERRORS) => void;
  setMessage: (message?: MESSAGES) => void;
  setScore: (score: number) => void;
  setStarterWord: (word: string) => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  // Initial states
  words: [],
  currentWord: "",
  error: undefined,
  displayMessage: false,
  message: undefined,
  score: 0,
  bestScore: getBestScore(),
  selectedBox: undefined,

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
        bestScore: Math.max(updatedScore, bestScore),
        displayMessage: false,
        message: undefined,
        error: undefined,
        selectedBox: undefined,
      };
    }),

  setSelectedBox: (index) => {
    set(({ words, error }) => ({
      selectedBox: index,
      currentWord:
        index === undefined
          ? words[words.length - 1]
          : setCharAt(words[words.length - 1], index, " "),
      error: undefined,
    }));
  },

  moveSelectedBox: (key) => {
    const { selectedBox } = get();
    if (selectedBox === undefined) return undefined;
    if (key === "ArrowLeft" && selectedBox > 0) {
      return selectedBox - 1;
    }
    if (key === "ArrowRight" && selectedBox < 4) {
      return selectedBox + 1;
    }
  },

  handleAddNewKey: (key: string) => {
    const { selectedBox } = get();
    if (selectedBox === undefined) {
      return;
    }
    set(({ currentWord }) => ({
      currentWord: setCharAt(currentWord, selectedBox, key),
    }));
  },

  setStarterWord: (word) =>
    set(({ score }) => ({ words: [word], score: score + 1 })),

  handleKeyPress: (key) => {
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
