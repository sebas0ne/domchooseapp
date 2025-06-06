// src/components/modals/AddFavoriteModal.jsx
import React from "react";
import ButtonIcon from '../../components/commons/ButtonIcon';
import ButtonText from "../commons/ButtonText";
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
    <div className="modal-overlay" onClick={onClose}>
     <div className="modal-content-add" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-add">
          <h2 className="modal-title-add">ADD FAVORITE LIST</h2>
          <ButtonIcon title="CLOSE" icon={X} onClick={onClose} size={16} className="close-button" />
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
            <ButtonText className="btnText" title={'SAVE'} onClick={handleSave}/>
          </div>
        </div>
     </div>
    </div>
  );
};

export default AddFavoriteModal;
