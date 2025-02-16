import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { String } from '../utils/String';
import { width } from '../utils/data';
import colors from '../utils/colors';

const ImagePickerModal = ({ onRequestClose, onImageSelected ,modalVisible,style,animationType,setModalVisible}) => {
  const handleImagePick = async (fromCamera = false) => {
    const options = {
      mediaType: String?.photo,
      quality: 1,
      includeBase64: false,
    };
    const pickerFunction = fromCamera ? launchCamera : launchImageLibrary;
    pickerFunction(options, (response) => {
      if (response.didCancel) {
        onImageSelected({ success: false, error: 'User cancelled image picker' });
      } else if (response.errorCode) {
        onImageSelected({ success: false, error: response.errorMessage || 'Unknown error' });
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        onImageSelected({ success: true, uri: imageUri });
      }
      onRequestClose(); // Close modal after selecting image
    });
  };

  return (
    <Modal  
    style={style ? style : styles.modalView}
    animationType={animationType ? animationType : String?.slide}
    transparent={true}
    visible={modalVisible?modalVisible:false}
    onRequestClose={() => {
      onRequestClose();
    }}
    onDismiss={() => {
        onRequestClose();
    }}
    >
      <View style={styles.container}>
            <View style={styles.innerContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleImagePick(false)}>
                <Text style={styles.buttonText}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleImagePick(true)}>
                <Text style={styles.buttonText}>Open Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
    </Modal>
  );
};

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

export default ImagePickerModal;
