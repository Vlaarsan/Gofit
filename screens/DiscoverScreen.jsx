import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import LogoApp from "../components/LogoApp";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ExoCard from "../components/ExoCard";
import { exoData } from "../constants/Data";
import CategoryButton from "../components/CategoryButton";
import { Muscles, Materials } from "../constants/Categories";

const DiscoverScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [inputFilter, setInputFilter] = useState(false);
  const [searchText, setSearchText] = useState("");
  

  const filterByCategory = (item) => {
    if (selectedCategories.length === 0 && selectedMaterials.length === 0) {
      return true;
    }
    return (
      (selectedCategories.length === 0 ||
        selectedCategories.includes(item.category)) &&
      (selectedMaterials.length === 0 ||
        selectedMaterials.includes(item.material))
    );
  };

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

  const toogleInput = () => setInputFilter(!inputFilter);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      // La catégorie est déjà sélectionnée, la retirer
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      // La catégorie n'est pas sélectionnée, l'ajouter
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleMaterial = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((mat) => mat !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };


  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/2086622/pexels-photo-2086622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}
      style={styles.backgroundImage}
    >
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoApp title={" Exercices"} />
          <TouchableOpacity style={styles.searchButton} onPress={toogleInput}>
            <FontAwesomeIcon icon={faSearch} size={20} color="#FF5733" />
          </TouchableOpacity>
        </View>
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
        <ScrollView
          horizontal
          contentContainerStyle={styles.CategoryButtonContainer}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          {Muscles.map((muscle, index) => (
            <View
              key={index}
              style={
                index !== Muscles.length - 1
                  ? styles.categoryButton
                  : [styles.categoryButton, { marginRight: 20 }]
              }
            >
              <CategoryButton
                name={muscle}
                onPressCallBack={() => toggleCategory(muscle)}
              />
            </View>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          contentContainerStyle={styles.CategoryButtonContainer}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          {Materials.map((material, index) => (
            <View
              key={index}
              style={
                index !== Materials.length - 1
                  ? styles.categoryButton
                  : [styles.categoryButton, { marginRight: 20 }]
              }
            >
              <CategoryButton
                key={index}
                name={material}
                onPressCallBack={() => toggleMaterial(material)}
              />
            </View>
          ))}
        </ScrollView>
        <FlatList
          style={styles.FlatList}
          data={exoData
            .filter(filterByCategory)
            .filter((item) => filterByName(item, searchText))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExoCard
              id={item.id}
              name={item.name}
              url={item.url}
              category={item.category}
              material={item.material}
              exempleImg={item.exempleImg}
              liked={item.liked}
            />
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchButton: {
    margin: 25,
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
  CategoryButtonContainer: {
    marginHorizontal: 10,
  },
  FlatList: {
    marginTop: 15,
  },
});
