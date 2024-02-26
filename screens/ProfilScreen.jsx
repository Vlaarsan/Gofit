import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TextComponent,
} from "react-native";
import { useUserContext } from "../context/UserContext";
import SaveUser from "../database/SaveUser";
import LogoApp from "../components/LogoApp";
import StepCounter from "../components/StepCounter";
import ProfilUpdateModal from "../modals/ProfilUpdateModal";
import Bubble from "../components/Bubble";

const ProfilScreen = () => {
  const { user, setUserContext } = useUserContext();
  const [pseudo, setPseudo] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");

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
  };

  return (
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
        <View style={styles.pseudoContainer}>
          <Bubble text={user.displayName} />
        </View>
        <View style={styles.heightContainer}>
          <Bubble text={`${user.height} cm`} />
        </View>
        <View style={styles.weightContainer}>
          <Bubble text={`${user.weight} kg`} />
        </View>
        <View style={styles.targetWeightContainer}>
          <Bubble text={`${user.targetWeight} kg`} />
        </View>
        <Text style={styles.objectifText}>Objectif : 🔥 👉 👉 </Text>
        <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
          <Text style={styles.buttonText}>Modifier le profil</Text>
        </TouchableOpacity>
        <View></View>
        <ProfilUpdateModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onUpdate={handleUpdateProfile}
        />
      </View>
    </ImageBackground>
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
    top: 270,
    right: 20,
    borderRadius: 100,
  },
  weightContainer: {
    position: "absolute",
    top: 370,
    left: 20,
    borderRadius: 100,
  },
  targetWeightContainer: {
    position: "absolute",
    top: 490,
    right: 20,
    borderRadius: 100,
  },
  button: {
    backgroundColor: "#8b50de",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 570,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  objectifText: {
    position: "absolute",
    bottom: 180,
    left: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 50,
    padding: 10,
  },
});
