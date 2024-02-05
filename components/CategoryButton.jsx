import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const CategoryButton = ({ name }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        { backgroundColor: isSelected ? "#8b50de" : "#fff" },
      ]}
    >
      <Text style={{ color: isSelected ? "#fff" : "#8b50de" }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 7,
    marginHorizontal: 7,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#8b50de",
  },
});
