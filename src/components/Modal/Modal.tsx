import React from "react";
import { useModalState } from "../../store";

export const Modal = () => {
  const { isModalOpen, closeModal } = useModalState();

  return isModalOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <p>Hello</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  ) : (
    <></>
  );
};
