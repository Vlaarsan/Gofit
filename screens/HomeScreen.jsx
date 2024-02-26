import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoApp from "../components/LogoApp";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useUserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageApp from "../components/ImageApp";


LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Jan.",
    "Fév.",
    "Mar.",
    "Avr.",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
};
LocaleConfig.defaultLocale = "fr";

const HomeScreen = () => {
  const [selected, setSelected] = useState([]);
  const { user, setUserContext } = useUserContext();

  useEffect(() => {
    // Charger la sauvegarde lors du montage du composant
    loadSelectedDates();
  }, []); // Le tableau vide en second argument assure que cela ne s'exécute qu'une seule fois au montage

  useEffect(() => {
    // Sauvegarder les dates sélectionnées chaque fois que la variable selected est mise à jour
    saveSelectedDates();
  }, [selected]); // Cela se déclenchera à chaque changement de selected

  const loadSelectedDates = async () => {
    try {
      const savedDates = await AsyncStorage.getItem('selectedDates');
      if (savedDates !== null) {
        // Convertir la chaîne JSON en tableau et mettre à jour l'état
        setSelected(JSON.parse(savedDates));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des dates sélectionnées:', error);
    }
  };

  const saveSelectedDates = async () => {
    try {
      // Convertir le tableau en chaîne JSON et sauvegarder
      await AsyncStorage.setItem('selectedDates', JSON.stringify(selected));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des dates sélectionnées:', error);
    }
  };


  const handleDayPress = (day) => {
    // Vérifie si le jour est déjà sélectionné
    const isSelected = selected.includes(day.dateString);

    if (isSelected) {
      // Si déjà sélectionné, retire-le de la liste
      setSelected((prevSelected) =>
        prevSelected.filter((selectedDay) => selectedDay !== day.dateString)
      );
      console.log("supprimé");
    } else {
      // Sinon, ajoute-le à la liste
      setSelected((prevSelected) => [...prevSelected, day.dateString]);
    }
    console.log("ajouté");
  };
  return (
    <SafeAreaView style={styles.container}>
      <LogoApp title={"Gofit"} />
      <Text style={styles.title}>Salut {user.displayName}</Text>
      <Text style={styles.message}>
        Pense à noter les jours où tu t'es entrainé 💪
      </Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selected.reduce((acc, day) => {
          acc[day] = {
            selected: true,
          };
          return acc;
        }, {})}
        theme={{
          calendarBackground: "#fff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#8b50de",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#8b50de",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          arrowColor: "#8b50de",
          monthTextColor: "#8b50de",
        }}
        style={styles.calendar}
      />
      <ImageApp/>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    margin: 25,
    fontWeight: "bold",
    fontSize: 28,
  },
  message: {
    fontSize: 16,
    marginTop: 60,
    padding: 10,
    textAlign: "center",
  },
  calendar: {
    marginTop: 25,
    marginHorizontal: 10,
  },
});
