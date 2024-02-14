import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useLikedExercisesContext } from "../context/LikedExercicesContext";
import { useUserContext } from "../context/UserContext";
import ExoCard from "../components/ExoCard";
import SaveFavorite from "../database/SaveFavorite";
import LoadFavorites from "../database/LoadFavorite";

const InsightScreen = () => {
  const { exercises, setExercises } = useLikedExercisesContext();
  const { user, setUserContext } = useUserContext();
  const [savable, setSavable] = useState(false);

  useEffect(() => {
    if (savable) {
      SaveFavorite(user, exercises);
    }
  }, [exercises]);

  useEffect(() => {
    LoadFavorites(user, setExercises, setSavable);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes favoris</Text>
      {exercises.length > 0 ? (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExoCard
              id={item.id}
              name={item.name}
              url={item.url}
              category={item.category}
              exempleImg={item.exempleImg}
            />
          )}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessageText}>
            Vous n'avez pas encore d'exercices favoris 💪. 
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  emptyMessageContainer: {
    backgroundColor: "#8b50de",
    alignSelf: "center",
    width: "70%",
    height: 150,
    borderRadius: 15,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#6a349f",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  
  emptyMessageText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  
});

export default InsightScreen;
