import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoApp from "../components/LogoApp";
import { Calendar, LocaleConfig } from "react-native-calendars";

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
  const handleDayPress = (day) => {
    // Vérifie si le jour est déjà sélectionné
    const isSelected = selected.includes(day.dateString);

    if (isSelected) {
      // Si déjà sélectionné, retire-le de la liste
      setSelected((prevSelected) =>
        prevSelected.filter((selectedDay) => selectedDay !== day.dateString)
      );
      console.log('supprimé');
    } else {
      // Sinon, ajoute-le à la liste
      setSelected((prevSelected) => [...prevSelected, day.dateString]);
    }
    console.log("ajouté");
  };
  return (
    <SafeAreaView style={styles.container}>
      <LogoApp title={"Gofit"} />
      <Text style={styles.title}>Salut user 👍</Text>
      <Text style={styles.message}>
        Pense à noter les jours ou tu t'es entrainé !
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
          selectedDayBackgroundColor: "#8b50de", // Fond violet pour le jour sélectionné
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#8b50de",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          arrowColor: "#8b50de",
          monthTextColor: "#8b50de",
        }}
        style={styles.calendar}
      />
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
    fontSize: 14,
    marginTop: 100,
    padding: 10,
    textAlign: "center",
  },
  calendar: {
    marginTop: 35,
  },
});
