import { useState, useRef } from "react";
import { isAlphabeticCharacter } from "../../utils";

type UseRow = {
  onRowFilled: (word: string) => Promise<void>;
  clearError: () => void;
};

export const useRow = ({ onRowFilled, clearError }: UseRow) => {
  const [rowValues, setRowValues] = useState<string[]>(Array(5).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!isAlphabeticCharacter(value)) {
      return;
    }
    const letter = value.toUpperCase();
    const updatedValues = [...rowValues];
    updatedValues[index] = letter;
    setRowValues(updatedValues);

    // Focus next input if the current one is filled
    if (letter !== "" && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if the row is fully filled
    if (updatedValues.every((val) => val !== "")) {
      onRowFilled(updatedValues.join(""));
    } else {
      clearError();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && rowValues[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return {
    inputRefs,
    rowValues,
    handleChange,
    handleKeyDown,
  };
};
