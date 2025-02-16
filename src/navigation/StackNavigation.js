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
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CommonText from '../components/CommonText';
import colors from '../utils/colors';
import Profile from '../assets/svg/profile.svg';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
const imageUri = useSelector(state => state.image.uri);
const Stack = createStackNavigator();
function HeaderLeft(screen) {
  return screen == String.tabScreen ? (
    <View style={styles.headerLeftLayout}>
      <TouchableOpacity
        onPress={{}}
        style={styles.profileIcon}>
        {!imageUri ? (
          <Profile width={String?.fortyFive} height={String?.fortyFive} />
        ) : (
          <Avatar.Image size={24} source={{uri: imageUri}} />
        )}
      </TouchableOpacity>
      <CommonText
        label={String?.hi + 'name' + '\n' + String?.budgetText}
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
      labelStyle={{color: 'white'}}
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
