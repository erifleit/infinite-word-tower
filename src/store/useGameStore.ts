import { create } from "zustand";
import { ERRORS, MESSAGES } from "../constants";

type GameState = {
  words: string[];
  setWords: (words: string[]) => void;
  currentWord: string;
  setCurrentWord: (word: string) => void;
  error: string | undefined;
  setError: (error: ERRORS | undefined) => void;
  displayMessage: boolean;
  setDisplayMessage: (loading: boolean) => void;
  message: MESSAGES | "";
  setMessage: (message: MESSAGES) => void;
  score: number;
  setScore: (score: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  words: [],
  setWords: (words) => set({ words }),

  currentWord: "",
  setCurrentWord: (word) => set({ currentWord: word }),

  error: undefined,
  setError: (error) => set({ error }),

  displayMessage: false,
  setDisplayMessage: (displayMessage) => set({ displayMessage }),

  message: "",
  setMessage: (message: MESSAGES) => set({ message }),

  score: 0,
  setScore: (score) => set({ score }),
}));
