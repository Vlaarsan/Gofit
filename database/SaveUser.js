import { auth, firestore } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";

const SaveUser = async (user) => {
  try {
    const userCollection = collection(firestore, "users");

    // Utilisation de doc avec spécification de l'ID du document (utilisation de l'uid comme ID)
    const userDocRef = doc(userCollection, user.uid);

    // Utilisation de setDoc pour ajouter ou mettre à jour le document
    await setDoc(userDocRef, user);

    console.log(
      "Données enregistrées avec succès ! UID utilisé comme ID du document :",
      user.uid
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données : ", error);
  }
};

export default saveUser;
