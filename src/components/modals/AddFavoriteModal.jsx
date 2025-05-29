// src/components/modals/AddFavoriteModal.jsx
import React from "react";
import LoaderOverlay from "../loaders/LoaderOverlay";
import "../../styles/modals/AddFavoriteModal.css";

const AddFavoriteModal = ({
    onClose,
    onSave,
    title,
    setTitle,
    options,
    setOptions,
    isLoading
  }) => {
    const handleSave = () => {
      if (!title.trim() || !options.trim()) return;
      onSave();
    };

  return (
    <>
        {isLoading && <LoaderOverlay />}
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
            <h3 className="modal-title">ADD FAVORITE LIST</h3>
            <button className="close-button" onClick={onClose}>×</button>
            </div>

            <div className="modal-body">
            <input
                className="modal-input"
                type="text"
                placeholder="LIST TITLE"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="modal-textarea"
                placeholder="ENTER OPTIONS SEPARATED BY COMMAS OR NEW LINES"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
            />
              <div className="button-group centered">
                <button className="save-button" onClick={handleSave}>SAVE</button>
              </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default AddFavoriteModal;
