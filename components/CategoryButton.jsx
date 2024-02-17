import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const CategoryButton = ({ name, onPressCallBack }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress();
        onPressCallBack();
      }}
      style={[
        styles.button,
        { backgroundColor: isSelected ? "#8b50de" : "#fff" },
      ]}
    >
       <Text style={[styles.buttonText, { color: isSelected ? "#fff" : "#8b50de" }]}> {name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 15,
    marginHorizontal: 8,
    paddingHorizontal: 7,
    height: 25,
    borderRadius: 25,
    borderWidth: 1.7,
    borderColor: "#8b50de",
    justifyContent: "center",
  },
  buttonText:{
    fontWeight: "bold",
    textAlign : "center",
    fontSize: 13,
  }
});
