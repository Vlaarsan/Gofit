import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email); // Utiliser sendPasswordResetEmail du module firebase/auth
      setResetSent(true);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du lien de réinitialisation :",
        error
      );
    }
  };

  return (
    <LinearGradient
      colors={["#fff", "#bb91fa", "#8b50de"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/ImageApp.png")}
          style={styles.image}
        />

        <Text style={styles.header}>Réinitialiser le mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity
          onPress={handleResetPassword}
          style={styles.resetButton}
        >
          <Text style={styles.buttonText}>
            Envoyer le lien de réinitialisation
          </Text>
        </TouchableOpacity>
        {resetSent && (
          <Text style={styles.resetSentText}>
            Lien de réinitialisation envoyé à {email}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 100,
  },
  input: {
    height: 45,
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: 15,
    paddingLeft: 20,
    width: "80%",
    color: "#000",
    borderWidth: 0.6,
  },
  resetButton: {
    width: "80%",
    backgroundColor: "#8b50de",
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  resetSentText: {
    marginTop: 30,
    color: "green",
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 15,
    marginTop: 40,
    color: "#000",
    fontWeight: "bold",
    backgroundColor: "#ddebe0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

export default ForgotPasswordScreen;
