import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
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
      {/* <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="rgba(1, 1, 1, 0.2)"
      /> */}
      <Image source={{ uri: url }} style={styles.image} />
      <View
        style={[
          styles.favoriteButton,
          isLiked
            ? { backgroundColor: "#8b50de" }
            : { backgroundColor: "#fff" },
        ]}
      >
        <FontAwesomeIcon icon={faHeart} size={10} color="#FF5733" />
      </View>
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
    top: 60,
    left: 20,
    padding: 10,
  },
  exempleImage: {
    marginTop: 25,
    width: "100%",
    height: 300,
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#fff",
    position: "absolute",
    right: 20,
    top: 250,
  },
});

export default DetailsExo;
