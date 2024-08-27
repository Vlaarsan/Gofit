import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useLikedExercisesContext } from "../context/LikedExercicesContext";
import { useUserContext } from "../context/UserContext";
import ExoCard from "../components/ExoCard";
import SaveFavorite from "../database/SaveFavorite";
import LoadFavorites from "../database/LoadFavorite";
import LoadUser from "../database/LoadUser";
import LogoApp from "../components/LogoApp";
import ImageApp from "../components/ImageApp";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const InsightScreen = () => {
  const { exercises, setExercises } = useLikedExercisesContext();
  const { user, setUserContext } = useUserContext();
  const [savable, setSavable] = useState(false);

  const [inputFilter, setInputFilter] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (savable) {
      SaveFavorite(user, exercises);
    }
  }, [exercises]);

  useEffect(() => {
    LoadFavorites(user, setExercises, setSavable);
    LoadUser(user, setUserContext);
  }, []);

  const toogleInput = () => setInputFilter(!inputFilter);

  const filterByName = (item) => {
    // Si aucun texte de recherche n'est saisi, on affiche tous les éléments
    if (!searchText || searchText.trim() === "") {
      return true;
    }

    // On convertit le nom de l'exercice en minuscules pour une comparaison insensible à la casse
    const itemName = item.name.toLowerCase();
    // On convertit également le texte de recherche en minuscules
    const searchQuery = searchText.toLowerCase();

    // On vérifie si le nom de l'exercice contient le texte de recherche
    return itemName.includes(searchQuery);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoApp title={"Mes Favoris"} />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={toogleInput}>
            <FontAwesomeIcon icon={faSearch} size={20} color="#FF5733" />
          </TouchableOpacity>
      {inputFilter && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Rechercher un exercice..."
              onChangeText={setSearchText}
              onSubmitEditing={() => setInputFilter(false)}
              value={searchText}
              placeholderTextColor="#fff"
              selectTextOnFocus={true}
            />
          </View>
        )}
      {exercises.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={exercises.filter((item) => filterByName(item, searchText))}
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
      <ImageApp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  logoContainer: {
    marginBottom: 70,
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
  searchButton: {
    position: "absolute",
    top: 80,
    margin: 25,
    flex:1,
    flexDirection:"row"
  },
  searchContainer: {
    marginBottom: 20,
    marginTop: 5,
    backgroundColor: "rgba(139, 80, 222, 0.5)",
    borderRadius: 15,
    paddingHorizontal: 15,
    width: "80%",
    alignSelf: "center",
  },
  textInput: {
    color: "#fff",
    fontSize: 16,
  },
});

export default InsightScreen;
