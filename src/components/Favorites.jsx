// src/components/Favorites.jsx
import React, { useEffect, useState } from "react";
import "../styles/Favorites.css";
import 'react-toastify/dist/ReactToastify.css';
import Menu from './commons/Menu';
import ButtonIcon from '../components/commons/ButtonIcon';
import AddFavoriteModal from "../components/modals/AddFavoriteModal";
import RandomOptionModal from "../components/modals/RandomOptionModal";
import EditFavoriteModal from "../components/modals/EditFavoriteModal";
import LoaderOverlay from "../components/loaders/LoaderOverlay";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import FavoriteCard from '../components/commons/FavoriteCard';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { getFavoriteLists, saveFavoriteList, deleteFavoriteList } from "../firebase/favoriteService";
import { Plus } from "lucide-react";

const Favorites = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState("");
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [listToEdit, setListToEdit] = useState(null);

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
      toast.error("Error getting favorites list!");
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
      toast.error("Error saving to favorites!");
    } finally {
      setIsLoading(false);
      toast.success("Option saved to favorites!");
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
      toast.error("Error deleting list!");
    } finally {
      setShowDeleteModal(false);
      setListToDelete(null);
      setIsLoading(false);
      toast.success("List successfully deleted!");
    }
  };

  const handleShuffle = (optionsArray) => {
    if (!optionsArray || optionsArray.length < 2) return;
    const randomIndex = Math.floor(Math.random() * optionsArray.length);
    setShuffledOption(optionsArray[randomIndex]);
    setShuffledOptions(optionsArray);
    setShowShuffleModal(true);
  };

  const handleEditClick = (list) => {
    setListToEdit(list);
    setShowEditModal(true);
  };

  const handleSaveEditedList = async (updatedTitle, updatedOptions) => {
    if (!listToEdit?.id) return;
    setIsLoading(true);
    try {
      await saveFavoriteList(updatedTitle, updatedOptions, listToEdit.id);
      toast.success("List updated successfully!");
      fetchFavorites();
      setShowEditModal(false);
    } catch (err) {
      toast.error("Error updating list!");
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
          <ButtonIcon className="iconButton" onClick={() => setShowModal(true)} icon={Plus} size={16} />
        </div>

        {isFetching
          ? Array.from({ length: 7 }).map((_, i) => (
              <FavoriteCard key={`skeleton-${i}`} loading />
            ))
          : favoriteLists.map((list) => (
              <FavoriteCard
                key={list.id}
                title={list.title}
                onEdit={() => handleEditClick(list)}
                onShuffle={() => handleShuffle(list.options)}
                onDelete={() => handleDeleteClick(list.id)}
                onView={() => {}}
              />
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

      {showEditModal && listToEdit && (
        <EditFavoriteModal
          initialTitle={listToEdit.title}
          initialOptions={listToEdit.options}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEditedList}
        />
      )}

      {isLoading && <LoaderOverlay />}
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </div>
  );
};

export default Favorites;
