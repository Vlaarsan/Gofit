import { auth, firestore } from "../firebase/config";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

const SaveWeight = async (user, id, averageWeight, maxWeight) => {
  try {
    // Obtenez une référence à la collection "weight"
    const weightCollection = collection(firestore, "weight");
    
    // Utilisation de doc avec l'ID de l'utilisateur comme nom du document
    const userDocRef = doc(weightCollection, user.uid,);

    // Utilisation de setDoc pour créer un nouveau document avec les données spécifiées
    await addDoc(userDocRef, {
      idExercice: id,
      averageWeight: averageWeight,
      maxWeight: maxWeight,
    });

    console.log(
      "Poids sauvegardé avec succès pour l'utilisateur",
      user.uid
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données : ", error);
  }
};

export default SaveWeight;
