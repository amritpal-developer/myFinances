import {getApp} from '@react-native-firebase/app';
import {auth as googleAuth} from '@react-native-firebase/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const auth = getAuth(getApp()); // ✅ New way to get auth instance
// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign In Function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error;
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
    '787255236981-i9ds36ediqg8djhu88m3a83ok3f5s4un.apps.googleusercontent.com',
});
export const googleSignIn = async () => {
  try {
    // Check if the device supports Google Play services
    await GoogleSignin.hasPlayServices();

    // Prompt the user to select a Google account
    const {idToken} = await GoogleSignin.signIn();

    // Create Firebase credential with the token
    const googleCredential = googleAuth.GoogleAuthProvider.credential(idToken);

    // Sign in the user with Firebase
    const userCredential = await googleAuth().signInWithCredential(
      googleCredential,
    );

    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error) {
    let errorMessage = 'Something went wrong. Please try again.';

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      errorMessage = 'User cancelled the login process.';
    } else if (error.code === statusCodes.IN_PROGRESS) {
      errorMessage = 'Sign-in process is already in progress.';
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMessage = 'Google Play services are not available or outdated.';
    } else {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};
