// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import {Platform} from 'react-native';
import {getFirestore} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCEd7ySR-nqEuAjIAzV238RNAvLRqlChNg',
  authDomain: 'finances-6867b.firebaseapp.com',
  projectId: 'finances-6867b',
  storageBucket: 'finances-6867b.appspot.com',
  messagingSenderId: '787255236981',
  appId:
    Platform.OS === 'ios'
      ? '1:787255236981:ios:9c3136ea0ca6508aa5db3c'
      : '1:787255236981:android:cff0b017bfe38314a5db3c',
};
// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Setup Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore DB
const db = getFirestore(app);

export {auth, db};
