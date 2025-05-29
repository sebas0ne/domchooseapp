// src/firebase/favoriteService.js
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db, serverTimestamp } from "../firebaseConfig";

const favoriteRef = collection(db, "favoriteLists");

export const saveFavoriteList = async (title, optionsArray) => {
  try {
    const docRef = await addDoc(collection(db, "favoriteLists"), {
      title,
      options: optionsArray,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding favorite list: ", error);
    throw error;
  }
};

export const getFavoriteLists = async () => {
  try {
    const snapshot = await getDocs(favoriteRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching favorite lists:", error);
    throw error;
  }
};

export const deleteFavoriteList = async (id) => {
  try {
    await deleteDoc(doc(db, "favoriteLists", id));
  } catch (error) {
    console.error("Error deleting favorite list: ", error);
    throw error;
  }
};