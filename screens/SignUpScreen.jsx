import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';



const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleSignup = () => {
    // Ajoutez ici la logique d'inscription avec Firebase ou tout autre backend
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SignupScreen</Text>
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
          secureTextEntry={true}
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
      <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Vous avez déjà un compte ?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Se connecter
        </Text>
      </Text>
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
    signupButton: {
      width: "80%",
      backgroundColor: "#4caf50",
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
      marginTop: 20,
      marginBottom: 20,
    },
    loginLink: {
      marginTop: 10,
      color: "#8b50de",
      textDecorationLine: "underline",
    },
  });

export default SignupScreen;
