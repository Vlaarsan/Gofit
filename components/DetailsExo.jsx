import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const DetailsExo = ({ route }) => {
  const { name, url, category, exempleImg, isLiked } = route.params;
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: url }} style={styles.image} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Discover")}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={25} color="#8b50de" />
      </TouchableOpacity>
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
    top: 30,
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
