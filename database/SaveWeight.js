import { firestore } from "../firebase/config";
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

const SaveWeight = async (user, id, name, averageWeight, maxWeight) => {
  try {
    // Vérifiez si l'utilisateur est correctement défini et contient l'ID de l'utilisateur
    if (!user || !user.uid) {
      console.error("Erreur: Utilisateur invalide");
      return;
    }

    // Obtenez une référence à la collection "weights" pour l'utilisateur
    const weightCollection = collection(firestore, "weights");

    // Utilisation de doc avec l'ID de l'utilisateur comme nom du document
    const userDocRef = doc(weightCollection, user.uid);

    // Récupérer les données actuelles de l'utilisateur
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    // Vérifier si l'exercice existe déjà dans les poids de l'utilisateur
    const existingExerciseIndex = userData.weights.findIndex(weight => weight.idExercice === id);

    if (existingExerciseIndex !== -1) {
      // L'exercice existe déjà, mettre à jour les poids
      const updatedWeights = [...userData.weights];
      updatedWeights[existingExerciseIndex] = { idExercice: id, name, averageWeight, maxWeight };

      await setDoc(userDocRef, { weights: updatedWeights });
    } else {
      // L'exercice n'existe pas encore, ajouter une nouvelle entrée
      await updateDoc(userDocRef, {
        weights: [...userData.weights, { idExercice: id, name, averageWeight, maxWeight }]
      });
    }

    console.log("Poids sauvegardés avec succès pour l'utilisateur", user.uid);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données : ", error);
  }
};

export default SaveWeight;
