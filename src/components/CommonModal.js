import React, {useState} from 'react';
import {View, Text, TextInput, Button, Modal} from 'react-native';

export function CommonModal({isVisible = false, onClose}) {
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log('Expense saved:', expenseType, amount);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.button} onPress={{}}>
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={{}}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

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
