import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "../firebase/config";
import { LinearGradient } from "expo-linear-gradient";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const handleSignup = () => {
    if (password === confirmPassword) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // L'utilisateur est créé avec succès, envoyez l'e-mail de confirmation
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("E-mail de confirmation envoyé avec succès!");
          });

          // Affichez le message à l'intérieur du bloc .then
          console.log("Utilisateur créé avec succès!");
          // Informez l'utilisateur de l'inscription réussie
          setConfirmation(
            "Inscription réussie ! Vous allez être redirigé."
          );
          setTimeout(() => {
            moveToLogin();
          }, 2000);
        })
        .catch((error) => {
          // Gérer les erreurs ici
          console.error(error);
        });
    } else {
      // Gérer le cas où les mots de passe ne correspondent pas
      console.error("Les mots de passe ne correspondent pas");
    }
  };

  const moveToLogin = () => {
    navigation.navigate("Login");
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
        <Text style={styles.header}>S'inscrire</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          {confirmation ? confirmation : "Vous avez déjà un compte ? "}
        </Text>
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Se connecter
        </Text>
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
  header: {
    marginTop: 10,
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  input: {
    height: 45,
    borderColor: "#000",
    borderWidth: 0.7,
    backgroundColor: "#d9d9d9",
    borderRadius: 15,
    marginBottom: 15,
    paddingLeft: 15,
    width: "90%",
  },
  passwordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
  },
  signupButton: {
    width: "80%",
    backgroundColor: "#8b50de",
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  loginText: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  loginLink: {
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default SignupScreen;
