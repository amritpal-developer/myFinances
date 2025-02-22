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
import Profile from '../assets/svg/profile.svg';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import ImagePickerModal from '../components/ImagePickerModal';
const imageUri = useSelector(state => state.image.uri);
const Stack = createStackNavigator();

function HeaderLeft(screen) {
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
          <Profile width={String?.fortyFive} height={String?.fortyFive} />
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
function HeaderTitle(screen) {
  return <View></View>;
}
function HeaderRight(screen) {
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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {StackScreens?.map((screen, index) => (
          <Stack.Screen
            options={{
              headerLeft: () => HeaderLeft(screen?.name),
              headerStyle: styles.headerStyle,
              headerTitle: () => HeaderTitle(screen?.name),
              headerRight: () => HeaderRight(screen?.name),
              headerShown: screen?.name == String?.tabScreen?true:false,
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
  headerStyle: {
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
