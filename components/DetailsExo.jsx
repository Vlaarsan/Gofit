import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button as PaperButton } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SaveWeight from "../database/SaveWeight";
import { useUserContext } from "../context/UserContext";
import LoadWeight from "../database/LoadWeight";

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
  const { user, setUserContext } = useUserContext();
  const [newAverageWeight, setNewAverageWeight] = useState(averageWeight);
  const [newMaxWeight, setNewMaxWeight] = useState(maxWeight);
  const [textInputVisible, setTextInputVisible] = useState(false);

  useEffect(() => {
    loadExerciseWeight();
  }, [])

  useEffect(() => {
    reload();
  

  }, [newAverageWeight, newMaxWeight])
  
 

  const toggleTextInputVisibility = () => {
    setTextInputVisible(!textInputVisible);
  };

  const handleSaveWeights = () => {
    setAverageWeight(newAverageWeight);
    setMaxWeight(newMaxWeight);
    SaveWeight(user, id, name, newAverageWeight, newMaxWeight);
    reload();
    setTextInputVisible(!textInputVisible);
  };

  const loadExerciseWeight = async () => {
    try {
      // Chargez les poids en fonction de l'ID de l'utilisateur et de l'ID de l'exercice
      const weight = await LoadWeight(user, id);

      // Mettez à jour l'état avec les poids de l'exercice
      setNewAverageWeight(weight?.averageWeight || 0);
      setNewMaxWeight(weight?.maxWeight || 0);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des poids de l'exercice :",
        error
      );
    } 
  ;};


const reload = () => {
  navigation.navigate("DetailsExo", {
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
        <Text style={styles.title}>Combien tu soulèves ? 🏋️</Text>
        <View style={styles.kgInfoContainer}>
          <Text style={styles.TextInfoKg}>
            Poids habituel {"     "} 👉 {"     " + averageWeight} kg
          </Text>
        </View>
        <View style={styles.kgInfoContainer}>
          <Text style={styles.TextInfoKg}>
            Poids maximal {"    "} 👉 {"     " + maxWeight} kg
          </Text>
        </View>
      </View>
      <Text style={styles.exerciseName}>{name}</Text>
      {textInputVisible && (
        <>
          <TextInput
            label="Nouveau poids habituel"
            keyboardType="numeric"
            value={newAverageWeight.toString()}
            onChangeText={(text) => setNewAverageWeight(text)}
            mode="outlined"
            textColor="#8b50de"
            selectTextOnFocus={true}
            style={styles.input}
          />
          <TextInput
            label="Nouveau poids maximal"
            keyboardType="numeric"
            value={newMaxWeight.toString()}
            onChangeText={(text) => setNewMaxWeight(text)}
            mode="outlined"
            textColor="#8b50de"
            selectTextOnFocus={true}
            style={styles.input}
          />
        </>
      )}
      {textInputVisible && (
        <PaperButton
          mode="contained"
          onPress={handleSaveWeights}
          style={[styles.saveButton, { backgroundColor: "#8b50de" }]}
        >
          Enregistrer
        </PaperButton>
      )}
      <Button
        title={textInputVisible ? "Cacher" : "Changer mes poids"}
        onPress={toggleTextInputVisibility}
      />
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
    borderRadius: 50,
    width: "80%",
    alignSelf: "center",
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
  },
  kgInfoContainer: {
    marginBottom: 10,
    marginLeft: 35,
  },
  TextInfoKg: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  input: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#fff",
    alignContent: "center",
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#8b50de",
  },
});

export default DetailsExo;
