import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import LogoApp from "../components/LogoApp";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ExoCard from "../components/ExoCard";
import { exoData } from "../constants/Data";
import CategoryButton from "../components/CategoryButton";

const DiscoverScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filterByCategory = (item) => {
    if (selectedCategory === null) {
      return true; // Afficher tous les éléments si aucune catégorie n'est sélectionnée
    }
    return item.category === selectedCategory;
  };

  const toggleCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoApp title={" Exercices"} />
        <TouchableOpacity style={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} size={20} color="#FF5733" />
        </TouchableOpacity>
      </View>
      <View style={styles.CategoryButtonContainer}>
        <CategoryButton
          name={"Biceps"}
          onPressCallBack={() => toggleCategory("Biceps")}
        />
        <CategoryButton
          name={"Dos"}
          onPressCallBack={() => toggleCategory("Dos")}
        />
        <CategoryButton
          name={"Pecs"}
          onPressCallBack={() => toggleCategory("Pecs")}
        />
        <CategoryButton
          name={"Triceps"}
          onPressCallBack={() => toggleCategory("Triceps")}
        />
      </View>
      <FlatList
        data={exoData.filter(filterByCategory)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExoCard
            id={item.id}
            name={item.name}
            url={item.url}
            category={item.category}
            exempleImg={item.exempleImg}
            liked={item.liked}
          />
        )}
      />
    </SafeAreaView>
  );
};


export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchButton: {
    margin: 25,
  },
  CategoryButtonContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
