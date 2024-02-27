import { firestore } from "../firebase/config";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const SaveUser = async (user) => {
  try {
    const userCollection = collection(firestore, "users");

    // Vérifier si le document de l'utilisateur existe déjà
    const userDocRef = doc(userCollection, user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // Le document de l'utilisateur existe déjà, mettre à jour ses données
      await updateDoc(userDocRef, user);
      console.log("Données de l'utilisateur mises à jour avec succès :", user.uid);
    } else {
      // Le document de l'utilisateur n'existe pas encore, créer un nouveau document
      await setDoc(userDocRef, user);
      console.log("Nouvel utilisateur ajouté à la base de données :", user.uid);
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données :", error);
  }
};

export default SaveUser;
