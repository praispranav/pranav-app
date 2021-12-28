import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Touchable,
  TouchableOpacity,
} from "react-native";

const ModalScreen = ({ visible, setModalVisible, data, setData }) => {
  const sortChange = (value) => {
    if (value === 1) {
      const result = data.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      console.log(result);
      setData(result);
    }
    if (value === 2) {
      const result = data.sort((a, b) => b.price - a.price);
      console.log(result);
      setData(result);
    }
    if (value === 3) {
      const result = data.sort((a, b) => {
        console.log(a.price, b.price);
        return a.price - b.price;
      });
      console.log(result);
      setData(result);
    }
    setModalVisible(false);
  };
  return (
    <>
      {visible && (
        <View
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Sort By:-</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => sortChange(1)}
                >
                  <Text style={styles.textStyle}>Name</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => sortChange(3)}
                >
                  <Text style={styles.textStyle}>Price: Low To High</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => sortChange(2)}
                >
                  <Text style={styles.textStyle}>Price: High To Low</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalScreen;
