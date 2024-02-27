import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase/config";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setResetSent(true);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du lien de réinitialisation :",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    marginTop: 50,
    color: "#000",
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
