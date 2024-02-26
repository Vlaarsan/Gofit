import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useUserContext } from '../context/UserContext';
import SaveUser from '../database/SaveUser';
import LogoApp from '../components/LogoApp';
import StepCounter from '../components/StepCounter';
import ProfilUpdateModal from '../modals/ProfilUpdateModal';

const ProfilScreen = () => {
  const { user, setUserContext } = useUserContext();
  const [pseudo, setPseudo] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUpdateProfile = ({ pseudo, height, weight, targetWeight }) => {
    // Mettez à jour les informations de profil ici
    setPseudo(pseudo);
    setHeight(height);
    setWeight(weight);
    setTargetWeight(targetWeight);
    updateDisplayName();
  };

  const updateDisplayName = () => {
    if (pseudo.trim() !== '') { 
      setUserContext({ ...user, displayName: pseudo });
      SaveUser({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: pseudo,
        height,
        weight,
        targetWeight,
      });
    } else {
      console.error('Please enter a valid pseudo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoApp title={"Profil"} />
      </View >
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pseudo : {pseudo} </Text>
 
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Taille (cm) : {height} </Text>

      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Poids (kg) : {weight} </Text>

      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Poids ciblé (kg) : {targetWeight} </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>Modifier le profil</Text>
      </TouchableOpacity>
      <ProfilUpdateModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onUpdate={handleUpdateProfile}
      />
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
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,

  },
});
