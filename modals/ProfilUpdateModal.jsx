// ModalUpdateProfile.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useUserContext } from "../context/UserContext";
const ProfilUpdateModal = ({ isVisible, onClose, onUpdate }) => {
  const [pseudo, setPseudo] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const { user, setUserContext } = useUserContext();

  const handleUpdate = () => {
    onUpdate({ pseudo, height, weight, targetWeight });
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Modifier le profil</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nouveau pseudo"
            value={user.displayName}
            onChangeText={setPseudo}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Nouvelle taille (cm)"
            value={user.height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Nouveau poids (kg)"
            value={user.weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Nouveau poids ciblé (kg)"
            value={user.targetWeight}
            onChangeText={setTargetWeight}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Mettre à jour</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </Modal>
  );
};

export default ProfilUpdateModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom:0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    alignSelf: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 15,
    borderBottomWidth: 1,
    borderColor: '#8b50de',
    marginBottom: 10,
    paddingLeft: 15,
  },
  button: {
    backgroundColor: '#8b50de',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
