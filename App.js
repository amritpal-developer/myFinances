import React, { useEffect, useState } from 'react';
import { LogBox, Alert, View } from 'react-native';
import { StackNavigation } from './src/navigation/StackNavigation';
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from './src/service/notifications';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { String } from './src/utils/String';
import LoadingScreen from './src/screens/LoadingScreen';
import Route from './src/navigation/Route';
import SplashScreen from 'react-native-splash-screen';
LogBox.ignoreAllLogs();

const App = () => {
  const [user, setUser] = useState(null);  // Initializing user state
  const [isLoading, setIsLoading] = useState(true); // Loading state to manage loading screen

  // Firebase Auth state listener (always called, never conditionally)
  useEffect(() => {
    SplashScreen.hide(); 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // Update user state
      setIsLoading(false); // Stop loading when the auth state is determined
    });

    // Clean up listener on unmount
    return unsubscribe;
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle notifications (always called, never conditionally)
  useEffect(() => {
    // Foreground notification listener
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('New Notification', JSON.stringify(remoteMessage));
    });

    // Background message handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // When the app is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('App opened from quit state by notification:', remoteMessage);
        }
      });

    // Clean up notification listeners
    return unsubscribe;
  }, []);

  // If loading, show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
// Don't change initialRouteName after first render!
const initialRoute = user? String.tabScreen : String.LoginScreen;
  // Render the main navigation based on whether the user is logged in
  return (
    <Route
       initialRouteName={initialRoute}
    />
  );
};

export default App;
