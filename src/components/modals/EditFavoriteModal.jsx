// src/components/modals/EditFavoriteModal.jsx
import React, { useState } from "react";
import "../../styles/modals/EditFavoriteModal.css";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import ButtonIcon from '../../components/commons/ButtonIcon';

const EditFavoriteModal = ({ onClose, onSave, initialTitle, initialOptions }) => {
  const [options, setOptions] = useState(initialOptions || []);
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    const trimmed = newOption.trim().toUpperCase();
    if (!trimmed) return;
    if (options.includes(trimmed)) {
      toast.error("Esta opción ya existe.");
      return;
    }
    setOptions(prev => [...prev, trimmed]);
    setNewOption("");
  };

  const handleRemoveOption = (optToRemove) => {
    setOptions(prev => prev.filter(opt => opt !== optToRemove));
  };

  const handleEditList = () => {
    if (!initialTitle || options.length === 0) {
      toast.error("Título u opciones inválidas.");
      return;
    }
    onSave(initialTitle, options);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-edit">
        <div className="modal-header-edit">
          <h3 className="modal-title-edit">FAVORITE LIST: {initialTitle}</h3>
          <ButtonIcon title="CLOSE" icon={X} onClick={onClose} size={16} className="close-button" />
        </div>
        <input
          className="option-input"
          placeholder="NUEVA OPCIÓN"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />
        <button className="button-save-edit" onClick={handleAddOption}>
          SAVE OPTION
        </button>
        <div className="registered-options">
          {options.map((opt, i) => (
            <button
              key={i}
              className="btn option-btn"
              onClick={() => handleRemoveOption(opt)}
              title="Click to remove"
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="button-group centered">
          <button className="button-save-edit" onClick={handleEditList}>
            EDIT LIST
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFavoriteModal;
