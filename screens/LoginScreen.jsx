import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import auth from "@react-native-firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      // L'utilisateur est connecté avec succès
      console.log("Utilisateur connecté :", userCredential.user.uid);
    } catch (error) {
      console.error("Erreur de connexion :", error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Connectez vous</Text>
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
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}
        >
          <Text>{showPassword ? "👁️" : "🔒"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupText}>
        <Text style={styles.signupLink}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.signupLink}>S'inscrire</Text>
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
    marginTop: 25,
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 150,
  },
  input: {
    height: 45,
    borderColor: "gray",
    backgroundColor: "#d9d9d9",
    borderRadius: 15,
    marginBottom: 15,
    paddingLeft: 10,
    width: "90%",
  },
  passwordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  loginButton: {
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
  signupText: {
    marginTop: 20,
    marginBottom: 20,
},
signupLink: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
