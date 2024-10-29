import { create } from "zustand";

type ModalState = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

export const useModalState = create<ModalState>((set) => ({
  isModalOpen: false,
  closeModal: () => set({ isModalOpen: false }),
  openModal: () => set({ isModalOpen: true }),
}));
