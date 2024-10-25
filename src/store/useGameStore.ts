import { create } from "zustand";

type GameState = {
  words: string[];
  setWords: (words: string[]) => void;
  currentWord: string;
  setCurrentWord: (word: string) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
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

  loading: false,
  setLoading: (loading) => set({ loading }),

  score: 0,
  setScore: (score) => set({ score }),
}));
