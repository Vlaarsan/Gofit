import React, { useState } from "react";
import { StyleSheet, Text, View,  } from "react-native";

const WeightInfos = ({ averageWeight, maxWeight }) => {



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informations de poids</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ton poids habituel  👉    {averageWeight} kg </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ton poids maximal  👉    {maxWeight} kg </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8b50de",
    margin: 20,
    padding: 10,
    borderRadius: 75,
    width: "80%",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
    marginLeft: 35,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },

});

export default WeightInfos;
