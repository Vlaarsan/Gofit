import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { useUserContext } from "../context/UserContext";
import SaveUser from "../database/SaveUser";
import LogoApp from "../components/LogoApp";
import ProfilUpdateModal from "../modals/ProfilUpdateModal";
import Bubble from "../components/Bubble";
import ImageApp from "../components/ImageApp";

const ProfilScreen = ({navigation} ) => {
  const { user, setUserContext } = useUserContext();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUpdateProfile = ({ pseudo, height, weight, targetWeight }) => {
    // Mettez à jour les informations de profil ici
    setUserContext({
      ...user,
      displayName: pseudo,
      height: height,
      weight: weight,
      targetWeight: targetWeight,
    });
    SaveUser({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: pseudo,
      height: height,
      weight: weight,
      targetWeight: targetWeight,
    });
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    navigation.replace("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseModal}>
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/2086622/pexels-photo-2086622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoApp title={"Profil"} />
        </View>
        <TouchableOpacity
          style={styles.pseudoContainer}
          onPress={handleOpenModal}
        >
          <Bubble text={user.displayName} title={"Pseudo"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.heightContainer}
          onPress={handleOpenModal}
        >
          <Bubble text={`${user.height} cm`} title={"Taille"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.weightContainer}
          onPress={handleOpenModal}
        >
          <Bubble text={`${user.weight} kg`} title={"Poids"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.targetWeightContainer}
          onPress={handleOpenModal}
        >
          <Bubble text={`${user.targetWeight} kg`} title={"Poids Cible"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>

        <ProfilUpdateModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onUpdate={handleUpdateProfile}
        />
      </View>
      <ImageApp />
    </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  pseudoContainer: {
    position: "absolute",
    top: 150,
    left: 20,
    borderRadius: 100,
  },
  heightContainer: {
    position: "absolute",
    top: 250,
    right: 20,
    borderRadius: 100,
  },
  weightContainer: {
    position: "absolute",
    top: 350,
    left: 20,
    borderRadius: 100,
  },
  targetWeightContainer: {
    position: "absolute",
    top: 470,
    right: 20,
    borderRadius: 100,
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    alignSelf:"center",
    width: "100%",
    backgroundColor: "#8b50de",
    padding: 15,
    borderRadius: 25,
  },
  logoutButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
