import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserContext } from '../context/UserContext'

const ProfilScreen = () => {
  const { user, setUserContext } = useUserContext();
  return (
    <View>
      <Text>{user.uid}</Text>
    </View>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({})