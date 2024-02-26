import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ImageApp = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/ImageApp.png")}
        style={styles.image}
      />
    </View>
  )
}

export default ImageApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 9999,
  },
  image: {
    width: 100, 
    height: 100, 
    margin: 5, 
  },
})
