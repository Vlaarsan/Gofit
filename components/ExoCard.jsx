import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const ExoCard = ({ name, url, category, exempleImg, }) => {

  const [isLiked, setisLiked] = useState(false);
  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate("DetailsExo", { name, url, category, exempleImg, isLiked });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={navigateToDetails}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity
          onPress={() => {
            setisLiked(!isLiked);
          }}
          style={[
            styles.favoriteButton,
            isLiked
              ? { backgroundColor: "#8b50de" }
              : { backgroundColor: "#fff" },
          ]}
        >
          <FontAwesomeIcon icon={faHeart} size={10} color="#FF5733" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 120,
    width: "90%",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#fff",
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});

export default ExoCard;
