import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

const LogoApp = ({title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBackground}>
          <FontAwesomeIcon icon={faDumbbell} size={15} color="#fff" />
        </View>
        <Text style={styles.title}> {title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20, 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBackground: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 15,
  },
  title: {
    color: '#000', 
    fontSize: 20,
    marginLeft: 10, 
    fontWeight: "bold"
  },
});

export default LogoApp;
