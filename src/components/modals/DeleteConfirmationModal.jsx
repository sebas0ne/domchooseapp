// src/components/modals/DeleteConfirmationModal.jsx
import React from "react";
import "../../styles/modals/DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ onClose, onConfirm}) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-delete">
        <div className="modal-header">
          <h2>ARE YOU SURE YOU WANT TO DELETE THE LIST?</h2>
        </div>
        <div className="modal-body-confirm-buttons">
          <button className="btn-cancel" onClick={onClose}>NO</button>
          <button className="btn-confirm" onClick={onConfirm}>YES</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DeleteConfirmationModal;
