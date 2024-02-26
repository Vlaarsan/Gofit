import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bubble = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  bubble: {
    backgroundColor: '#8b50de',
    borderRadius: 100,
    width: 115,
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default Bubble;
