import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {width} from '../utils/data';
import colors from '../utils/colors';
import RNPickerSelect from 'react-native-picker-select';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
export function CommonModal({
  isVisible = false,
  onClose,
  onSubmit,
  title = 'Add Expense',
  typeOfModal,
  categoryList = [],
  defaultValues = {},
}) {
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  useEffect(() => {
    // Pre-fill if default values are passed
    if (defaultValues) {
      setInputTitle(defaultValues.title || '');
      setCategory(defaultValues.category || '');
      setCustomCategory(defaultValues.customCategory || '');
      setAmount(defaultValues.amount || '');
    }
  }, [isVisible]);
  const handleAdd = () => {
    const finalCategory = category === 'others' ? customCategory : category;
    onSubmit({
      title: inputTitle,
      category: finalCategory,
      amount,
    });
    onClose(); // Close modal after submission
  };
  const handleSave = () => {
    // Handle save logic here
    console.log('Expense saved:', expenseType, amount);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    console.log('modal',typeOfModal),
    <Modal
      visible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}>
      {typeOfModal === String?.ImagePickerType ? (
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
      ) : typeOfModal === String?.AddExpensesType ? (
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={inputTitle}
              onChangeText={setInputTitle}
            />
            <RNPickerSelect
              onValueChange={setCategory}
              items={categoryList}
              value={category}
              placeholder={{label: 'Select Category', value: null}}
              style={pickerSelectStyles}
            />
            {category === 'others' && (
              <TextInput
                style={styles.input}
                placeholder="Custom Category"
                value={customCategory}
                onChangeText={setCustomCategory}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
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
  overlay: {
    flex:1,
    height:responsiveScreenHeight(20),
    width:responsiveScreenWidth(20),
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    color: 'black',
    marginVertical: 8,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    color: 'black',
    marginVertical: 8,
  },
};
