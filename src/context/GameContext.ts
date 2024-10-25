import {
  useState,
  useMemo,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

type WordState = {
  currentWord: string;
  setCurrentWord: Dispatch<SetStateAction<string>>;
  words: string[];
  setWords: Dispatch<SetStateAction<string[]>>;
};

const wordState: WordState = {
  words: [],
  setWords: () => {},
  currentWord: "",
  setCurrentWord: () => {},
};

type ErrorState = {
  error: string | undefined;
  setError: Dispatch<SetStateAction<string | undefined>>;
};

const errorState: ErrorState = {
  error: undefined,
  setError: () => {},
};

type LoadingState = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const loadingState: LoadingState = {
  loading: false,
  setLoading: () => {},
};

type ScoreState = {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
};

const scoreState = {
  score: 0,
  setScore: () => {},
};

type GameState = WordState & ErrorState & LoadingState & ScoreState;

const gameState: GameState = {
  ...wordState,
  ...errorState,
  ...loadingState,
  ...scoreState,
};

export const GameContext = createContext<GameState>(gameState);

export const useGameContext = () => {
  const [words, setWords] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [loading, setLoading] = useState(false);

  const contextValue: GameState = useMemo(
    () => ({
      score,
      setScore,
      words,
      setWords,
      currentWord,
      setCurrentWord,
      error,
      setError,
      loading,
      setLoading,
    }),
    [
      score,
      setScore,
      words,
      setWords,
      currentWord,
      setCurrentWord,
      error,
      setError,
      loading,
      setLoading,
    ]
  );

  return contextValue;
};
