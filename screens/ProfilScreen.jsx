import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import SaveUser from '../database/SaveUser';

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
      <Text style={styles.title}>Profil</Text>
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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
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
