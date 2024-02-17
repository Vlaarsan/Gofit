import React, { useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useUserContext } from "../context/UserContext";
import SaveUser from "../database/SaveUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUserContext } = useUserContext();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Utilisateur connecté avec succès!");

      // Obtenez l'objet user à partir de userCredential
      const user = userCredential.user;
      setUserContext(user);

      // Enregistrez l'utilisateur dans la base de données
      SaveUser({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        // Ajoutez d'autres propriétés d'utilisateur si nécessaire
      });

      // Enregistrez les valeurs de l'e-mail et du mot de passe dans AsyncStorage
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);

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
    <ImageBackground
      source={{ uri: 'https://www.pixelstalk.net/wp-content/uploads/images6/Cool-Workout-Background.jpg' }}
      style={styles.backgroundImage}
    >
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
    </ImageBackground>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    marginTop: 40,
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 180,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Couleur de l'ombre
    textShadowOffset: { width: 2, height: 2 }, // Décalage de l'ombre
    textShadowRadius: 5, // Rayon de l'ombre
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
  passwordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 25,
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
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
