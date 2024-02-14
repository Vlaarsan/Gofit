import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, } from "../firebase/config";
import { useUserContext } from "../context/UserContext";
import SaveUser from "../database/SaveUser";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUserContext } = useUserContext();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Utilisateur connecté avec succès!");
      
      // Obtenez l'objet user à partir de userCredential
      const user = userCredential.user;
      setUserContext (user);
      
      // Enregistrez l'utilisateur dans la base de données
      SaveUser({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: "Anonymous",
        // Ajoutez d'autres propriétés d'utilisateur si nécessaire
      });
      
      // Remplacez la ligne suivante par le code de navigation approprié
      navigation.replace("MyStack");
    } catch (error) {
      console.error(error);
      console.log("Erreur lors de la connexion !");
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

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
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
