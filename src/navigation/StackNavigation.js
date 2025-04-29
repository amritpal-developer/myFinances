import {createStackNavigator} from '@react-navigation/stack';
import {String} from '../utils/String';
import {NavigationContainer} from '@react-navigation/native';
import {
  GrayProfileImage,
  StackScreens,
  darkTheme,
  height,
  phoneTheme,
  profileImage,
  width,
} from '../utils/data';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebaseConfig';
import Button from '../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonText from '../components/CommonText';
import colors from '../utils/colors';
import ProfileLight from '../assets/svg/lightTheme/profile.svg';
import ProfileDark from '../assets/svg/darkTheme/darkProfile.svg';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import ImagePickerModal from '../components/ImagePickerModal';
import {useTheme as useCustomTheme, useTheme} from '../utils/ThemeProvider';
import {logout} from '../utils/auth';
import CustomDialog from '../components/CustomDialog';
import AppHeader from '../components/header/AppHeader';
const imageUri = useSelector(state => state.image.uri);
const Stack = createStackNavigator();
function HeaderLeft(screen, isDarkMode) {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleImageSelection = data => {
    if (data.success) {
      setImageUri(data.uri);
    } else {
      Alert.alert(String?.error, data.error);
    }
  };
  return screen == String.tabScreen ? (
    <View style={styles.headerLeftLayout}>
      <ImagePickerModal
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onImageSelected={handleImageSelection}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.profileIcon}>
        {!imageUri ? (
          isDarkMode ? (
            <ProfileLight
              width={String?.fortyFive}
              height={String?.fortyFive}
            />
          ) : (
            <ProfileDark width={String?.fortyFive} height={String?.fortyFive} />
          )
        ) : (
          <Avatar.Image size={String?.fortyFive} source={{uri: imageUri}} />
        )}
      </TouchableOpacity>
      <CommonText
        label={String?.hi + ' AMRITPAL' + '\n' + String?.budgetText}
        style={[
          styles.expenseText,
          {color: isDarkMode ? colors?.white : colors?.black},
        ]}
      />
    </View>
  ) : (
    <View></View>
  );
}
async function handleSignOut(navigation, onCancel) {
  try {
    await logout(auth);
    console.log('User signed out');
    onCancel();
    navigation.navigate(String?.LoginScreen);
  } catch (error) {
    console.error('Sign out error:', error.message);
  }
}
function HeaderTitle(screen, isDarkMode) {
  return <View></View>;
}
function HeaderRight(screen, isDarkMode, navigation) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function onCancel() {
    setIsDialogOpen(false);
  }
  return screen == String.tabScreen ? (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CustomDialog
        visible={isDialogOpen}
        type="delete"
        title="Delete Item"
        message="Are you sure you want to Logout?"
        onConfirm={handleSignOut(navigation, onCancel)}
        onCancel={onCancel}
      />
      <Button
        style={styles.headerRightButton}
        label={String?.MyTransactions}
        labelStyle={{color: isDarkMode ? colors?.white : colors?.black}}
      />
      <TouchableOpacity onPress={() => setIsDialogOpen(true)}>
        <Ionicons
          name="exit-outline"
          size={30}
          color={isDarkMode ? colors?.white : colors?.black}
          style={styles.exit}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View></View>
  );
}
export function StackNavigation({initialRouteName}) {
  const {theme} = useTheme();
  const {isDarkMode, toggleTheme} = useCustomTheme();
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {StackScreens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={({navigation}) => ({
              headerShown: true,
           
              header: props => (
                <AppHeader
                  {...props}
                  screen={screen.name}
                  isDarkMode={isDarkMode}
                  navigation={navigation}
                />
              ),
              headerStyle: {
                height: 100, // ⬅️ Add this
              },
            })}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  profileIcon: {marginRight: '5%', tintColor: 'white'},
  headerLeftLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyleWhite: {
    height: height * 0.14,
    backgroundColor: colors?.white,
  },
  headerStyleBlack: {
    height: height * 0.14,
    backgroundColor: colors?.black,
  },
  headerRightButton: {
    borderWidth: 2,
    borderColor: colors?.gray,
    padding: '5%',
    marginRight: '5%',
    borderRadius: 12,
  },
  exit: {
    marginRight: '10%',
  },
});
