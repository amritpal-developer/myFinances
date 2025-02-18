import {LogBox, StyleSheet, Text, View, YellowBox} from 'react-native';
import React, { useEffect } from 'react';
import {StackNavigation} from './src/navigation/StackNavigation';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { requestUserPermission } from './src/service/notifications';
LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification', JSON.stringify(remoteMessage));
    });
  
    return unsubscribe;
  }, []);
  useEffect(() => {
    requestUserPermission();
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('User tapped on the notification:', remoteMessage);
    });
  
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state by notification:', remoteMessage);
        }
      });
  }, []);
  
  return <StackNavigation />;
};

export default App;

