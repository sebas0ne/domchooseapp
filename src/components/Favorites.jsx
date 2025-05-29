// src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import "../styles/Favorites.css";
import Menu from './Menu';
import AddFavoriteModal from "../components/modals/AddFavoriteModal";
import { Eye, Pencil, Trash2, Shuffle } from "lucide-react";
import { getFavoriteLists, saveFavoriteList } from "../firebase/favoriteService";

const Favorites = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState("");
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setIsFetching(true);
    try {
      const lists = await getFavoriteLists();
      setFavoriteLists(lists);
    } catch (error) {
      console.error("Failed to fetch favorite lists:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSaveFavorite = async () => {
    if (!title.trim() || !options.trim()) return;
    setIsLoading(true);
  
    const parsedOptions = options
      .split(/[\n,]+/)
      .map(opt => opt.trim())
      .filter(opt => opt);
    try {
      await saveFavoriteList(title, parsedOptions);
      setShowModal(false);
      setTitle("");
      setOptions("");
      fetchFavorites();
    } catch (err) {
      console.error("Error saving favorite list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="favorites">
      <Menu />
      <div className="favorite-grid">
        <div className="favorites-header">
          <h2 className="favorites-title">Favorites</h2>
          <button className="add-button" onClick={() => setShowModal(true)}>+</button>
        </div>
          {isFetching
              ? Array.from({ length: 7 }).map((_, i) => (
                  <div className="favorite-card-skeleton" key={`skeleton-${i}`}>
                    <h3 className="card-title">LOADING...</h3>
                    <div className="card-buttons">
                        <button title="VIEW"><Eye size={16} /></button>
                        <div className="button-column">
                          <button title="EDIT"><Pencil size={16} /></button>
                          <button title="SHUFFLE"><Shuffle size={16} /></button>
                        </div>
                        <button title="DELETE"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))
              : favoriteLists.map((list, index) => (
                  <div className="favorite-card" key={list.id || index}>
                    <h3 className="card-title">{list.title.toUpperCase()}</h3>
                    <div className="card-buttons">
                        <button title="VIEW"><Eye size={16} /></button>
                        <div className="button-column">
                          <button title="EDIT"><Pencil size={16} /></button>
                          <button title="SHUFFLE"><Shuffle size={16} /></button>
                        </div>
                        <button title="DELETE"><Trash2 size={16} /></button>
                    </div>
                  </div>
           ))}
        </div>

      {showModal && (
        <AddFavoriteModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveFavorite}
          title={title}
          setTitle={setTitle}
          options={options}
          setOptions={setOptions}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default Favorites;
