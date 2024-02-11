import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import {
  LikedExercisesProvider,
  useLikedExercisesContext,
} from "../context/LikedExercicesContext";
import { useUserContext } from "../context/UserContext";
import DeleteFavoriteModal from "../modals/DeleteFavoriteModal";
import { createCardScaleAnimation } from "../animation/CardAnimation";
import SaveFavorite from "../database/SaveFavorite";

const ExoCard = ({ id, name, url, category, exempleImg }) => {
  const navigation = useNavigation();
  const { exercises, addExercise, removeExercise } = useLikedExercisesContext();
  const [modalVisible, setModalVisible] = useState(false);
  const isLiked = exercises.some((exercise) => exercise.id === id);
  const { cardScale, startAnimation } = createCardScaleAnimation();
  const { user, setUserContext } = useUserContext();

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
      startAnimation();
    }
  };

  useEffect(() => {
    SaveFavorite(user.uid, exercises);
  }, [exercises]);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.backgroundImage}
      />
      <TouchableOpacity style={styles.cardContent} onPress={navigateToDetails}>
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
      </TouchableOpacity>
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
