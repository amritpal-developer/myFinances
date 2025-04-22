import {getApp} from '@react-native-firebase/app';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
// Sign Up Function
export const signUp = async (fullName,email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      fullName,
      email,
      createdAt: new Date()
    });

    console.log('User registered & data saved');
    return { success: true, user };
  } catch (error) {
    let message = "Something went wrong.";
    if (error.code === 'auth/email-already-in-use') {
      message = "This email is already registered. Try logging in.";
    } else if (error.code === 'auth/invalid-email') {
      message = "Invalid email format.";
    } else if (error.code === 'auth/weak-password') {
      message = "Password should be at least 6 characters.";
    }
    console.error("Sign up error:", error.code);
    return { success: false, message };
  }
};

// Sign In Function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Signed in user:', userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let message = 'Something went wrong.';
    if (error.code === 'auth/wrong-password') {
      message = 'Incorrect password.';
    } else if (error.code === 'auth/user-not-found') {
      message = 'User not found.';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Invalid email format.';
    } else if (error.code === 'auth/invalid-credential') {
      message = 'Invalid credentials. Try again.';
    }

    console.error('Sign in error:', error.code);
    return { success: false, message };
  }
};
export const logout = async () => {
  try {

    // Attempt to sign out the user
    await signOut(auth);

    // Log success message
    console.log('User signed out');
    
    // Additional logic can go here, like redirecting to the login screen
    // navigation.replace('Login');
    
  } catch (error) {
    // Handling specific Firebase error codes for better error messages
    if (error.code === 'auth/no-current-user') {
      console.error('No user is currently signed in.');
    } else if (error.code === 'auth/network-request-failed') {
      console.error('Network error occurred. Please check your connection.');
    } else {
      // General error message
      console.error('Sign out error:', error.message);
    }
    
    // Optionally, show an alert to the user or display error message in the UI
    Alert.alert('Sign out failed: ' + error.message);
  }
};
// Sign Out Function
export const AccountSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
GoogleSignin.configure({
  webClientId:
  "787255236981-i9ds36ediqg8djhu88m3a83ok3f5s4un.apps.googleusercontent.com"
});
export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const { idToken } = await GoogleSignin.signIn();

    const authInstance = getAuth(getApp());
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const userCredential  = await auth().signInWithCredential(googleCredential);

    const user = userCredential.user;

    return {
      success: true,
      user:user,
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    };
  } catch (error) {
    console.error('🔥 Google Sign-In Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
