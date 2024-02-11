import { View, Text } from "react-native";
import React from "react";
import { auth, firestore } from "../firebase/config";
import { collection, doc, updateDoc, setDoc} from "firebase/firestore";

const SaveFavorite = async (user, newFavorite) => {
  try {
    // Référence au document de l'utilisateur spécifique
    const userDocRef = doc(firestore, "users", user.uid);

    // Utilisation de updateDoc pour ajouter ou mettre à jour le champ favorite dans le document utilisateur
    await setDoc(userDocRef, {
      favorite: newFavorite,
    });

    console.log("Champ 'favorite' ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données : ", error);
  }
};

export default SaveFavorite;
