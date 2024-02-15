import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import WeightInfos from "./WeightInfos";

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

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: url }} style={styles.image} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={25} color="#8b50de" />
      </TouchableOpacity>
      <WeightInfos
      averageWeight={averageWeight}
      maxWeight={maxWeight}/>
      <Text style={styles.exerciseName}>{name}</Text>
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
});

export default DetailsExo;
