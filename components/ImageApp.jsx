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
    zIndex: 9999, // assure que l'image est au-dessus de tous les autres éléments
  },
  image: {
    width: 100, // ajustez la largeur selon vos besoins
    height: 100, // ajustez la hauteur selon vos besoins
    margin: 10, // ajustez le margin selon vos besoins
  },
})
