import { useState, useRef, useMemo } from "react";
import { isAlphabeticCharacter } from "../../utils";
import { useGameStore, useUIState } from "../../store";

type UseRow = {
  rowIndex: number;
  value: string;
};

export const useRow = ({ rowIndex, value }: UseRow) => {
  const { words, currentWord, setSelectedBox } = useGameStore();
  const { keyboardVisible, toggleKeyboard } = useUIState();

  const lastWord = useMemo(() => words[words.length - 1], [words]);

  const handleClickBox = (index: number) => {
    if (words.length > 0) {
      setSelectedBox(index);
    }
    if (!keyboardVisible) {
      toggleKeyboard();
    }
  };

  const rowValues = useMemo(
    () =>
      Array.from({ length: 5 }).map((_elem, index) => {
        return value[index] || "";
      }),
    [value]
  );

  return {
    lastWord,
    lastWordIndex: words.length - 1,
    isNewRow: words.length === rowIndex && rowIndex > 0,
    currentWord,
    handleClickBox,
    rowValues,
  };
};
