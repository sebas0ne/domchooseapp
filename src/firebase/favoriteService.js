// src/firebase/favoriteService.js
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const favoriteRef = collection(db, "favoriteLists");

export const saveFavoriteList = async (title, options, id = null) => {
  if (typeof title !== "string" || !Array.isArray(options)) {
    throw new Error("Invalid title or options.");
  }
  const data = {
    title,
    options,
  };
  if (id) {
    const listRef = doc(db, "favoriteLists", id);
    await setDoc(listRef, data);
  } else {
    const collectionRef = collection(db, "favoriteLists");
    await addDoc(collectionRef, data);
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