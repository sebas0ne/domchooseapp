// src/components/modals/EditFavoriteModal.jsx
import React, { useState } from "react";
import "../../styles/modals/EditFavoriteModal.css";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import ButtonIcon from '../../components/commons/ButtonIcon';
import ButtonText from "../commons/ButtonText";

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
          className="optionInput"
          placeholder="NUEVA OPCIÓN"
          value={newOption}
          name="Edit alias"
          onChange={(e) => setNewOption(e.target.value)}
        />
        <ButtonText className="btnText" title={'SAVE OPTION'} onClick={handleAddOption}/>
        <div className="registered-options">
          {options.map((opt, i) => (
            <ButtonText className="btnText" key={i} title={opt} onClick={() => handleRemoveOption(opt)}/>
          ))}
        </div>
        <div className="button-group centered">
          <ButtonText className="btnText" title={'EDIT LIST'} onClick={handleEditList}/>
        </div>
      </div>
    </div>
  );
};

export default EditFavoriteModal;
