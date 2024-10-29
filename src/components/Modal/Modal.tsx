import React from "react";
import { useUIState } from "../../store";

export const Modal = () => {
  const { isModalOpen, closeModal } = useUIState();

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
