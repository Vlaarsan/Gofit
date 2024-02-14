import { auth, firestore } from "../firebase/config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const SaveUser = async (user) => {
  try {
    const userCollection = collection(firestore, "users");

    // Utilisation de doc avec spécification de l'ID du document (utilisation de l'uid comme ID)
    const userDocRef = doc(userCollection, user.uid);

    // Vérification de l'existence du document avant la sauvegarde
    const docSnapshot = await getDoc(userDocRef);

    if (!docSnapshot.exists()) {
      // Le document n'existe pas, on peut le créer
      await setDoc(userDocRef, user);

      console.log(
        "Données enregistrées avec succès ! UID utilisé comme ID du document :",
        user.uid
      );
    } else {
      console.log("Document déjà présent");
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données : ", error);
  }
};

export default SaveUser;
