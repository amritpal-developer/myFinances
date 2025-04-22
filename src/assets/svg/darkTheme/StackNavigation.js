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
import Button from '../components/Button';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CommonText from '../components/CommonText';
import colors from '../utils/colors';
import Profile from '../assets/svg/lightTheme/profile.svg';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import ImagePickerModal from '../components/ImagePickerModal';
import {useTheme as useCustomTheme, useTheme} from '../utils/ThemeProvider';
const imageUri = useSelector(state => state.image.uri);
const Stack = createStackNavigator();
function HeaderLeft(screen,isDarkMode) {
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
          <Profile width={String?.fortyFive} height={String?.fortyFive} color={'black'}/>
        ) : (
          <Avatar.Image size={String?.fortyFive} source={{uri: imageUri}} />
        )}
      </TouchableOpacity>
      <CommonText
        label={String?.hi + ' AMRITPAL' + '\n' + String?.budgetText}
        style={[styles.expenseText, {color: 'white'}]}
      />
    </View>
  ) : (
    <View></View>
  );
}
function HeaderTitle(screen,isDarkMode) {
  return <View></View>;
}
function HeaderRight(screen,isDarkMode) {
  return screen == String.tabScreen ? (
    <Button
      style={styles.headerRightButton}
      label={String?.MyTransactions}
      labelStyle={{color: colors?.white}}
    />
  ) : (
    <View></View>
  );
}
export function StackNavigation() {
  const {theme} = useTheme();
  const {isDarkMode, toggleTheme} = useCustomTheme();
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {StackScreens?.map((screen, index) => (
          <Stack.Screen
            options={{
              headerLeft: () => HeaderLeft(screen?.name,isDarkMode),
              headerStyle: isDarkMode
                ? styles.headerStyleWhite
                : styles.headerStyleBlack,
              headerTitle: () => HeaderTitle(screen?.name,isDarkMode),
              headerRight: () => HeaderRight(screen?.name,isDarkMode),
              headerShown: screen?.name == String?.tabScreen ? true : false,
            }}
            key={index}
            name={screen.name}
            component={screen.component}
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
    marginRight: '15%',
    borderRadius: 12,
  },
});
