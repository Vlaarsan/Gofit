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
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  bubble: {
    backgroundColor: '#8b50de',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Bubble;
