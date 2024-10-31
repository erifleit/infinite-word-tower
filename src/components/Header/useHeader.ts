import { useGameStore, useUIState } from "../../store";

export const useHeader = () => {
  const { words, bestScore } = useGameStore();
  const { openModal, setKeyboardVisible, keyboardVisible } = useUIState();

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
