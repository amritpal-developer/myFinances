import React, { useState } from 'react';
import {View, Alert, StyleSheet, Modal, SafeAreaView} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import { width} from '../utils/data';
import {String} from '../utils/String';
import {setImageUri} from '../dataManagement/imageSlice';
import colors from '../utils/colors';
import { useDispatch } from 'react-redux';

  const handleImagePick = type => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false, // Set true if you need base64 format
    };
    const callback = response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled the image picker.');
      } else if (response.errorCode) {
        Alert.alert('Error', getErrorMessage(response.errorCode));
      } else if (response.assets && response.assets.length > 0) {
        dispatch(setImageUri(response.assets[0].uri)); // Save URI in Redux
      }
    };
    {
      type === String?.camera
        ? launchCamera(options, callback)
        : launchImageLibrary(options, callback);
    }
  };
  // Custom error messages based on error codes
  const getErrorMessage = errorCode => {
    switch (errorCode) {
      case 'camera_unavailable':
        return 'Camera is unavailable on this device.';
      case 'permission':
        return 'Please grant camera/gallery permission to use this feature.';
      case 'others':
      default:
        return 'Something went wrong. Please try again.';
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Modal
        style={styles.modalView}
        animationType={String?.slide}
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        onDismiss={() => {
          setShowModal(!showModal);
        }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleImagePick(String?.gallery);
       
            }}>
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleImagePick(String?.camera);
            
            }}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ImagePickerComponent;

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
