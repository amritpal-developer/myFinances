import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {height, tabScreens} from '../utils/data';
import colors from '../utils/colors';
const Tab = createBottomTabNavigator();
export function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabLayout,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      {tabScreens?.map((screen, index) => (
        <Tab.Screen
          key={index}
          options={{
            tabBarLabel: screen?.tabBarLabel,
            tabBarIcon: ({focused}) => screen?.tabBarIcon(focused),
          }}
          name={screen?.name}
          component={screen?.component}
        />
      ))}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabLayout: {
    position: 'absolute',
    marginHorizontal: '10%',
    backgroundColor: colors?.blackMist,
    height: height * 0.08,
    bottom: '5%',
    borderRadius: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '3%',
    borderTopColor: 'transparent', // Removes the white line
    elevation: 0, // Removes shadow on Android
    shadowOpacity: 0,
  },
});
