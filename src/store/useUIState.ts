import { create } from "zustand";

type UIState = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  keyboardVisible: boolean;
  setKeyboardVisible: (keyboardVisible: boolean) => void;
};

export const useUIState = create<UIState>((set) => ({
  isModalOpen: false,
  closeModal: () => set({ isModalOpen: false }),
  openModal: () => set({ isModalOpen: true }),
  keyboardVisible: false,
  setKeyboardVisible: (keyboardVisible) => set({ keyboardVisible }),
}));
