import { getApp } from '@react-native-firebase/app';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from '@react-native-firebase/auth';

const auth = getAuth(getApp()); // ✅ New way to get auth instance
// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth,email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign In Function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth,email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign Out Function
export const AccountSignOut = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error;
  }
};
