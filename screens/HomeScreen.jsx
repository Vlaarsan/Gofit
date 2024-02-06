import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoApp from "../components/LogoApp";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LogoApp title={"Gofit"} />
      <Text style={styles.title}>Salut user 👍</Text>
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
});
