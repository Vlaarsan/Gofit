import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  View,
} from "react-native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DetailsExo = ({ route }) => {
  const {
    id,
    name,
    url,
    category,
    exempleImg,
    averageWeight,
    maxWeight,
    setAverageWeight,
    setMaxWeight,
  } = route.params;

  const navigation = useNavigation();

  const [newAverageWeight, setNewAverageWeight] = useState(averageWeight);
  const [newMaxWeight, setNewMaxWeight] = useState(maxWeight);

  const handleSaveWeights = () => {
    setAverageWeight(newAverageWeight);
    setMaxWeight(newMaxWeight);
    
    navigation.navigate('DetailsExo', {
      id: id,
      name: name,
      url: url,
      category: category,
      exempleImg: exempleImg,
      averageWeight: newAverageWeight,
      maxWeight: newMaxWeight,
      setAverageWeight: setAverageWeight,
      setMaxWeight: setMaxWeight,
    });
  };
  



  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: url }} style={styles.image} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={25} color="#8b50de" />
      </TouchableOpacity>
      <View style={styles.containerKg}>
        <Text style={styles.title}>Informations de poids</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Ton poids habituel 👉 {averageWeight} kg
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ton poids maximal 👉 {maxWeight} kg </Text>
        </View>
      </View>
      <Text style={styles.exerciseName}>{name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nouveau poids moyen"
        keyboardType="numeric"
        value={newAverageWeight.toString()} // Assurez-vous de convertir la valeur en chaîne
        onChangeText={(text) => setNewAverageWeight(text)} // Mettre à jour la nouvelle valeur du poids moyen
      />

      <TextInput
        style={styles.input}
        placeholder="Nouveau poids maximal"
        keyboardType="numeric"
        value={newMaxWeight.toString()} // Assurez-vous de convertir la valeur en chaîne
        onChangeText={(text) => setNewMaxWeight(text)} // Mettre à jour la nouvelle valeur du poids maximal
      />

      <Button title="Enregistrer" onPress={handleSaveWeights} />

      <Image source={{ uri: exempleImg }} style={styles.exempleImage} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
    marginBottom: 25,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
  },
  exempleImage: {
    marginTop: 25,
    width: "100%",
    height: 300,
  },
  containerKg: {
    backgroundColor: "#8b50de",
    margin: 20,
    padding: 10,
    borderRadius: 75,
    width: "80%",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
    marginLeft: 35,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default DetailsExo;
