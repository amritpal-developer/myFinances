import { db } from '../../firebaseConfig'; // adjust this path
import { doc, setDoc, addDoc, collection, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore';

// Save a document (with a custom ID)
export const saveDocument = async (path, id, data) => {
  try {
    const docRef = doc(db, path, id);
    await setDoc(docRef, data);
    console.log(`Saved document at ${path}/${id}`);
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
};

// Add a document (auto ID generated)
export const addDocument = async (path, data) => {
  try {
    const colRef = collection(db, path);
    const docRef = await addDoc(colRef, data);
    console.log(`Added document at ${path}/${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Get documents (optional ordering)
export const getDocuments = async (path, orderField = 'createdAt', orderDirection = 'desc') => {
  try {
    const colRef = collection(db, path);
    const q = query(colRef, orderBy(orderField, orderDirection));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (path, id) => {
  try {
    const docRef = doc(db, path, id);
    await deleteDoc(docRef);
    console.log(`Deleted document at ${path}/${id}`);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
