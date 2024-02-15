import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import SaveUser from '../database/SaveUser';
import LogoApp from '../components/LogoApp';

const ProfilScreen = () => {
  const { user, setUserContext } = useUserContext();
  const [pseudo, setPseudo] = useState('');

  const handlePseudoChange = (text) => {
    setPseudo(text);
  };

  const updateDisplayName = () => {
    if (pseudo.trim() !== '') { 
      setUserContext({ ...user, displayName: pseudo });
      SaveUser({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: pseudo,
      });
    } else {
      console.error('Please enter a valid pseudo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <LogoApp
      title={"Profil"}/>
      </View >
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pseudo : </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tapez votre pseudo ici"
          value={pseudo}
          onChangeText={handlePseudoChange}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={updateDisplayName}>
        <Text style={styles.buttonText}>Mettre à jour le pseudo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  textInput: {
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: '#8b50de',
    flex: 1,
    textAlign: "center",
  },
  button: {
    backgroundColor: '#8b50de', // Customize button color
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
