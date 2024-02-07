import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useLikedExercisesContext } from "../context/LikedExercicesContext";
import DeleteFavoriteModal from "../modals/DeleteFavoriteModal";

const ExoCard = ({ id, name, url, category, exempleImg }) => {
  const navigation = useNavigation();
  const { exercises, addExercise, removeExercise } = useLikedExercisesContext();
  const [modalVisible, setModalVisible] = useState(false);
  const isLiked = exercises.some((exercise) => exercise.name === name);
  const cardScale = useRef(new Animated.Value(1)).current;

  const navigateToDetails = () => {
    navigation.navigate("DetailsExo", {
      id,
      name,
      url,
      category,
      exempleImg,
      isLiked,
    });
  };

  const toggleLike = () => {
    if (isLiked) {
      setModalVisible(!modalVisible);
    } else {
      addExercise({ id, name, url, category, exempleImg });
      // Déclenche l'animation d'agrandissement de la carte
      Animated.timing(cardScale, {
        toValue: 1.4,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Une fois l'animation terminée, revient à l'échelle normale
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
        });
      });
    }
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
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
          onPress={toggleLike}
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
      <DeleteFavoriteModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        id={id}
        onDelete={() => {
          removeExercise(id);
          setModalVisible(false);
        }}
        name={name}
        url={url}
        category={category}
      />
    </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 120,
    width: "95%",
    marginVertical: 10,
 alignSelf: "center",
  },
  backgroundImage: {
    borderRadius: 40,
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
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
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
