import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const LoadWeight = async (user, exerciseId) => {
  try {

    // Obtenez une référence au document de l'utilisateur dans la collection "weights"
    const userDocRef = doc(firestore, "weights", user.uid);

    // Récupérer les données du document de l'utilisateur
    const userDocSnapshot = await getDoc(userDocRef);

    // Vérifiez si le document existe
    if (userDocSnapshot.exists()) {
      // Récupérez les poids de l'utilisateur à partir des données du document
      const userData = userDocSnapshot.data();
      const weights = userData.weights || [];
      
      // Rechercher les poids correspondant à l'ID de l'exercice spécifié
      const exerciseWeight = weights.find(weight => weight.idExercice === exerciseId);
      
      if (exerciseWeight) {
        console.log("Poids chargés avec succès pour l'exercice avec l'ID :", exerciseId);
        return exerciseWeight;
      } else {
        console.log("Aucun poids trouvé pour l'exercice avec l'ID :", exerciseId);
        return null;
      }
    } else {
      console.log("Aucun poids trouvé pour l'exercice avec l'ID :", exerciseId);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors du chargement des poids : ", error);
    return null;
  }
};

export default LoadWeight;
