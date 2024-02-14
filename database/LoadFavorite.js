import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useLikedExercisesContext } from "../context/LikedExercicesContext";

const LoadFavorites = async (user, setExercices, setSavable) => {
  try {
    // Référence au document de l'utilisateur spécifique
    const userDocRef = doc(firestore, "favorite", user.uid);

    // Obtenez les données du document utilisateur
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // Récupérez les favoris de l'utilisateur
      const favorites = userDocSnap.data().favorite;
      setExercices(favorites);
      setSavable(true);

      console.log("Favoris chargés avec succès !");
    } else {
      console.error("Document utilisateur introuvable");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des favoris : ", error);
  }
};

export default LoadFavorites;
