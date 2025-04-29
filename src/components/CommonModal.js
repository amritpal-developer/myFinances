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
import {deleteDoc, doc, Timestamp} from 'firebase/firestore';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {saveDocument, saveExpense} from '../service/firestoreService';
import {useSelector} from 'react-redux';
import {serverTimestamp} from 'firebase/firestore';
import {String} from '../utils/String';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../../firebaseConfig';
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
  const userId = useSelector(state => state.uid);
  useEffect(() => {
    // Pre-fill if default values are passed
    if (defaultValues) {
      setInputTitle(defaultValues.title || '');
      setCategory(defaultValues.category || '');
      setCustomCategory(defaultValues.customCategory || '');
      setAmount(defaultValues.amount || '');
    }
  }, [isVisible]);
  const handleAdd = async () => {
    console.error('Error adding expense:');
    const finalCategory = category === 'others' ? customCategory : category;
    const user = auth.currentUser;

      const userId = user.uid;
      console.log('User ID:', userId);

    const expenseId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;;
    console.error('Error adding expense:2');
    const expenseData = {
      title: inputTitle,
      category: finalCategory,
      amount: parseFloat(amount),
      createdAt: serverTimestamp(), // you can also use serverTimestamp() if imported
      userId: userId, // if you want to link expenses to a user
    };
    console.error('Error adding expense:');
    try {
      await saveDocument(`users/${userId}/expenses`, expenseId, expenseData);
      onClose();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
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
    console.log('modal', typeOfModal),
    (
      <Modal
        visible={isVisible}
        transparent
        animationType={String?.slide}
        onRequestClose={() => {
          onClose();
        }}
        onDismiss={() => {
          onClose();
        }}
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
                placeholderTextColor={colors?.gray}
                value={inputTitle}
                onChangeText={setInputTitle}
              />
              <RNPickerSelect
                onValueChange={setCategory}
                items={categoryList}
                value={category}
                placeholder={{
                  label: 'Select Category',
                  value: null,
                  color: colors?.gray,
                }}
                style={pickerSelectStyles}
              />
              {category === 'others' && (
                <TextInput
                  style={styles.input}
                  placeholder="Custom Category"
                  value={customCategory}
                  placeholderTextColor={colors?.gray}
                  onChangeText={setCustomCategory}
                />
              )}
              <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                placeholderTextColor={colors?.gray}
                value={amount}
                onChangeText={setAmount}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}>
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
    )
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // More readable overlay
  },
  innerContainer: {
    width: '100%',
    backgroundColor: colors.blackMist || '#222',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    borderRadius: 10,
    marginVertical: 8,
    width: '85%',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
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
