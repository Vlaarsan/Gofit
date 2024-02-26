import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useLikedExercisesContext } from "../context/LikedExercicesContext";
import { useUserContext } from "../context/UserContext";

const LoadUser = async (user, setUser) => {
    try {
        // Référence au document de l'utilisateur spécifique
        const userDocRef = doc(firestore, "users", user.uid);
    
        // Obtenez les données du document utilisateur
        const userDocSnap = await getDoc(userDocRef);
    
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            // Mettre à jour l'utilisateur avec le nouveau displayName
            setUser({
                ...user,
                displayName: userData.displayName,
                height: userData.height,
                weight: userData.weight,
                targetWeight: userData.targetWeight,
               
            });
    
            console.log("Profil chargé !");
        } else {
            console.error("Document utilisateur introuvable");
        }
    } catch (error) {
        console.error("Erreur lors du chargement du Pseudo : ", error);
    }
};

export default LoadUser;
