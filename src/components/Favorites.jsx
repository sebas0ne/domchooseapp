// src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import "../styles/Favorites.css";
import Menu from './commons/Menu';
import ButtonIcon from '../components/commons/ButtonIcon';
import AddFavoriteModal from "../components/modals/AddFavoriteModal";
import RandomOptionModal from "../components/modals/RandomOptionModal";
import LoaderOverlay from "../components/loaders/LoaderOverlay";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import { Eye, Pencil, Trash2, Shuffle, Plus } from "lucide-react";
import { getFavoriteLists, saveFavoriteList, deleteFavoriteList } from "../firebase/favoriteService";

const Favorites = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState("");
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [showShuffleModal, setShowShuffleModal] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [shuffledOption, setShuffledOption] = useState("");

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

  const handleDeleteClick = (listId) => {
    setListToDelete(listId);
    setShowDeleteModal(true);
  };
  
  const handleConfirmDelete = async () => {
    if (!listToDelete) return;
    setIsLoading(true);
    try {
      await deleteFavoriteList(listToDelete);
      setFavoriteLists(prev => prev.filter(list => list.id !== listToDelete));
    } catch (error) {
      console.error("Failed to delete list:", error);
    } finally {
      setShowDeleteModal(false);
      setListToDelete(null);
      setIsLoading(false);
    }
  };

  const handleShuffle = (optionsArray) => {
    if (!optionsArray || optionsArray.length < 2) return;
    const randomIndex = Math.floor(Math.random() * optionsArray.length);
    setShuffledOption(optionsArray[randomIndex]);
    setShuffledOptions(optionsArray);
    setShowShuffleModal(true);
  };

  return (
    <div className="favorites">
      <Menu />
      <div className="favorite-grid">
        <div className="favorites-header">
          <h2 className="favorites-title">Favorites</h2>
          <ButtonIcon className="iconButton" onClick={() => setShowModal(true)} icon={Plus} size={16} />
        </div>
          {isFetching
              ? Array.from({ length: 7 }).map((_, i) => (
                  <div className="favorite-card-skeleton" key={`skeleton-${i}`}>
                    <h3 className="card-title">LOADING...</h3>
                    <div className="card-buttons">
                        <ButtonIcon title="VIEW" icon={Eye} size={16} className="iconButton" />
                        <div className="button-column">
                          <ButtonIcon title="EDIT" icon={Pencil} size={16} className="iconButton" />
                          <ButtonIcon title="SHUFFLE" icon={Shuffle} size={16} className="iconButton" />
                        </div>
                        <ButtonIcon title="DELETE" icon={Trash2} size={16} className="iconButton" />
                    </div>
                  </div>
                ))
              : favoriteLists.map((list, index) => (
                  <div className="favorite-card" key={list.id || index}>
                    <h3 className="card-title">{list.title.toUpperCase()}</h3>
                    <div className="card-buttons">
                        <ButtonIcon title="VIEW" icon={Eye} size={16} className="iconButton" />
                        <div className="button-column">
                          <ButtonIcon title="EDIT" icon={Pencil} size={16} className="iconButton" />
                          <ButtonIcon title="SHUFFLE" onClick={() => handleShuffle(list.options)} icon={Shuffle} size={16} className="iconButton" />
                        </div>
                        <ButtonIcon title="DELETE" onClick={() => handleDeleteClick(list.id)} icon={Trash2} size={16} className="iconButton" />
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

      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}

      {showShuffleModal && (
        <RandomOptionModal
          option={shuffledOption}
          onClose={() => setShowShuffleModal(false)}
          options={shuffledOptions}
        />
      )}

      {isLoading && <LoaderOverlay />}
    </div>
  );
};

export default Favorites;
