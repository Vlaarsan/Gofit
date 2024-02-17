import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
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
    source={{ uri: 'https://images.pexels.com/photos/2086622/pexels-photo-2086622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
    style={styles.backgroundImage}
    >
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoApp title={" Exercices"} />
        <TouchableOpacity style={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} size={20} color="#FF5733" />
        </TouchableOpacity>
      </View>
      <ScrollView
  horizontal
  contentContainerStyle={styles.CategoryButtonContainer}
  decelerationRate="fast"
  showsHorizontalScrollIndicator={false}
>
  {Muscles.map((muscle, index) => (
    <View key={index} style={index !== Muscles.length - 1 ? styles.categoryButton : [styles.categoryButton, { marginRight: 20 }]}>
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
          <View key={index} style={index !== Materials.length - 1 ? styles.categoryButton : [styles.categoryButton, { marginRight: 20 }]}>
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
        data={exoData.filter(filterByCategory)}
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
    </SafeAreaView>
        </ImageBackground>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
  CategoryButtonContainer: {
    marginHorizontal: 10,
  },
  FlatList: {
    marginTop: 15,
  },
});
