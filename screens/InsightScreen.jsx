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
});

export default InsightScreen;
