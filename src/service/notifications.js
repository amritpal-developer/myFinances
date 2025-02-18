import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
export async function requestUserPermission() {
  if (Platform.OS == 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    granted == PermissionsAndroid.RESULTS.GRANTED
      ? getFCMToken()
      : Alert.alert('Permission denied', 'Enable notifications in settings.');
  } else {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFCMToken();
      console.log('Notification permission granted.');
    } else {
      Alert.alert('Permission denied', 'Enable notifications in settings.');
    }
  }
}
async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
}
