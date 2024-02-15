import { auth, firestore } from "../firebase/config";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const SaveUser = async (user) => {
  try {
    const userCollection = collection(firestore, "users");

    // Utilisation de doc avec spécification de l'ID du document (utilisation de l'uid comme ID)
    const userDocRef = doc(userCollection, user.uid);

    await updateDoc(userDocRef, user);

    console.log(
      "Données enregistrées avec succès ! UID utilisé comme ID du document :",
      user.uid
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données : ", error);
  }
};

export default SaveUser;

