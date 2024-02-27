import { firestore } from "../firebase/config";
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

const SaveWeight = async (user, id, name, averageWeight, maxWeight) => {
  try {
    const weightCollection = collection(firestore, "weights");
    const userDocRef = doc(weightCollection, user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // Le document de l'utilisateur existe, mettre à jour les poids
      await updateDoc(userDocRef, {
        weights: [
          ...userDocSnapshot.data().weights.filter(weight => weight.idExercice !== id),
          { idExercice: id, name, averageWeight, maxWeight }
        ]
      });
    } else {
      // Le document de l'utilisateur n'existe pas, le créer
      await setDoc(userDocRef, {
        weights: [{ idExercice: id, name, averageWeight, maxWeight }]
      });
    }

    console.log("Poids sauvegardés avec succès pour l'utilisateur", user.uid);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données : ", error);
  }
};

export default SaveWeight;
