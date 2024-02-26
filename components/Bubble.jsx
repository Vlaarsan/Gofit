import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bubble = ({ text, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  bubble: {
    backgroundColor: '#8b50de',
    borderRadius: 100,
    borderWidth: 3,
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  title: {
    color: '#fff',
    fontSize: 8,
  },
});

export default Bubble;
