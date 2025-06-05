// src/components/commons/FavoriteCard.jsx
import React from 'react';
import ButtonIcon from './ButtonIcon';
import { Eye, Pencil, Shuffle, Trash2 } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FavoriteCard = ({
  title = '',
  loading = false,
  onView,
  onEdit,
  onShuffle,
  onDelete
}) => {
  return (
    <div className="favorite-card">
      <h3 className="card-title">
        {loading ? <Skeleton width={120} height={20} baseColor="#1D63FF" highlightColor="#fff" borderRadius="0.5rem" /> : title.toUpperCase()}
      </h3>
      <div className="card-buttons">
        <ButtonIcon
          title="VIEW"
          onClick={onView}
          icon={Eye}
          size={16}
          className="iconButton"
          disabled={loading}
        />
        <div className="button-column">
          <ButtonIcon
            title="EDIT"
            onClick={onEdit}
            icon={Pencil}
            size={16}
            className="iconButton"
            disabled={loading}
          />
          <ButtonIcon
            title="SHUFFLE"
            onClick={onShuffle}
            icon={Shuffle}
            size={16}
            className="iconButton"
            disabled={loading}
          />
        </div>
        <ButtonIcon
          title="DELETE"
          onClick={onDelete}
          icon={Trash2}
          size={16}
          className="iconButton"
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default FavoriteCard;
