import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";

const DeleteFavoriteModal = ({ id, name, url, visible, onClose, onDelete }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.9)" translucent={true} />
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Supprimer des favoris ?</Text>

            <View style={styles.imageContainer}>
              <Image source={{ uri: url }} style={styles.modalImage} />
              <Text style={styles.imageText}>{name}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onDelete}
                style={[styles.button, styles.deleteButton]}
              >
                <Text style={styles.buttonText2}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteFavoriteModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    padding: 30,
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  imageContainer: {
    alignItems: "center",
  },
  modalImage: {
    width: 350,
    height: 120,
    borderRadius: 30,
    marginBottom: 10,
  },
  imageText: {
    position: "absolute",
    bottom: 27,
    right: 30,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    borderRadius: 25,
  },
  cancelButton: {
    backgroundColor: "#dcdcdc",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#8b50de",
    marginLeft: 10,
  },
  buttonText: {
    color: "#8b50de",
    fontWeight: "bold",
  },
  buttonText2: {
    color: "#fff",
    fontWeight: "bold",
  },
});
