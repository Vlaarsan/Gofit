import { View, Text } from "react-native";
import React from "react";
import { auth, firestore } from "../firebase/config";
import { collection, doc, updateDoc, setDoc, getDoc} from "firebase/firestore";

const SaveFavorite = async (user, newFavorite) => {
  try {
    // Référence au document de l'utilisateur spécifique
    const userDocRef = doc(firestore, "favorite", user.uid);

    // Récupère le document utilisateur
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // Si le document existe, utilise updateDoc pour mettre à jour le champ favorite
      await updateDoc(userDocRef, {
        favorite: newFavorite,
      });
      console.log("Champ 'favorite' mis à jour avec succès !");
    } else {
      // Si le document n'existe pas, utilise setDoc pour créer le document avec le champ favorite
      await setDoc(userDocRef, {
        favorite: newFavorite,
      });
      console.log("Champ 'favorite' ajouté avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données : ", error);
  }
};

export default SaveFavorite;