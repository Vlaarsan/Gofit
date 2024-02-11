import { auth, firestore } from "../firebase/config";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useLikedExercisesContext } from "../context/LikedExercicesContext";

const LoadFavorites = async (user) => {
  const { exercises, setExercices } = useLikedExercisesContext();

  try {
    // Référence au document de l'utilisateur spécifique
    const userDocRef = doc(firestore, "users", user.uid);

    // Obtenez les données du document utilisateur
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // Récupérez les favoris de l'utilisateur
      const favorites = userDocSnap.data().favorite;
      setExercices(favorites);

      console.log("Favoris chargés avec succès !");
    } else {
      console.error("Document utilisateur introuvable");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des favoris : ", error);
  }
};

export default LoadFavorites;
