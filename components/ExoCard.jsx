import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ExoCard = ({ name, url }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
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
