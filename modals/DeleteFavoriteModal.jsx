import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";

const DeleteFavoriteModal = ({ id, name, url, category }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        /* Fonction de fermeture de la modal */
      }}
    >
      <View style={styles.modalContainer}>
        {/* Contenu de la modal */}
        <View style={styles.modalContent}>
          {/* Image de l'exercice */}
          <Image source={{ uri: url }} style={styles.modalImage} />

          {/* Nom de l'exercice */}
          <Text style={styles.modalText}>{name}</Text>

          {/* Catégorie de l'exercice */}
          <Text style={styles.modalText}>{category}</Text>

          {/* Bouton de fermeture de la modal */}
          <TouchableOpacity
            onPress={() => {
              /* Logique de suppression ici */
            }}
          >
            <Text style={styles.closeButton}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteFavoriteModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
});
