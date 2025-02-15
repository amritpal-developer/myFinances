import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import {String} from '../utils/String';
import colors from '../utils/colors';
import {width} from '../utils/data';
import {OpenCamera, SelectImage} from './imagePicker';
const CustomModal = ({
  modalVisible,
  setModalVisible,
  style,
  onRequestClose,
  animationType,
  imagePicker,
}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Modal
        style={style ? style : styles.modalView}
        animationType={animationType ? animationType : String?.slide}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          onRequestClose();
        }}
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}>
        {imagePicker ? (
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={SelectImage}>
                <Text style={styles.buttonText}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={OpenCamera}>
                <Text style={styles.buttonText}>Open Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </Modal>
    </SafeAreaView>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {},
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#000000AA',
  },
  innerContainer: {
    width: width,
    backgroundColor: colors?.blackMist,
    padding: '10%',
    borderTopEndRadius: '10%',
    borderTopStartRadius: '10%',
    alignItems: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    color: '#aaa',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
