// src/components/modals/AddFavoriteModal.jsx
import React from "react";
import ButtonIcon from '../../components/commons/ButtonIcon';
import { X } from "lucide-react";
import "../../styles/modals/AddFavoriteModal.css";

const AddFavoriteModal = ({
    onClose,
    onSave,
    title,
    setTitle,
    options,
    setOptions,
  }) => {
    const handleSave = () => {
      if (!title.trim() || !options.trim()) return;
      onSave();
    };

  return (
    <>
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content-add" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-add">
            <h3 className="modal-title-add">ADD FAVORITE LIST</h3>
            <ButtonIcon title="CLOSE" icon={X} onClick={onClose} size={16} className="iconButton" />
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
