import Dashboard from '../screens/Dashboard';
import History from '../screens/History';
import profile from '../screens/profile';
import Home from '../assets/svg/Home.svg';
import home from '../screens/home';
import Calculator from '../assets/svg/calculator.svg';
import Profile from '../assets/svg/profile.svg';
import HistoryIcon from '../assets/svg/history.svg';
import {String} from './String';
import {Dimensions, TouchableOpacity} from 'react-native';
import Login from '../screens/Login';
import {BottomTab, bottomTab} from '../navigation/bottomTab';
import {Appearance} from 'react-native';
import colors from './colors';
import moment from 'moment';
import OTPScreen from '../screens/OTPScreen';
export const height = Dimensions.get('screen').height;
export const currentMonth = moment().format('dddd');
export const width = Dimensions.get('screen').width;
export const darkTheme =
  Appearance.getColorScheme() == 'dark' ? colors?.black : colors?.white;
export const tabScreens = [
  {
    name: String?.homeScreen,
    component: home,
    tabBarLabel: String?.homeScreen,
    tabBarIcon: (focused) => (
      <TouchableOpacity
        style={
          focused
            ? {
                padding: '40%',
                backgroundColor: colors?.purple,
                borderRadius: 100,
              }
              : {padding:0}
        }>
        <Home
          width={String?.twentyFive}
          height={String?.twentyFive}
          fill="white"
        />
      </TouchableOpacity>
    ),
  },
  {
    name: String?.DashboardScreen,
    component: Dashboard,
    tabBarLabel: String?.DashboardScreen,
    tabBarIcon: (focused) => (
      <TouchableOpacity
        style={
          focused
            ? {
                padding: '40%',
                backgroundColor: colors?.purple,
                borderRadius: 100,
              }
              : {padding:0}
        }>
        <Calculator width={String?.twentyFive} height={String?.twentyFive} />
      </TouchableOpacity>
    ),
  },
  {
    name: String?.profileScreen,
    component: profile,
    tabBarLabel: String?.profileScreen,
    tabBarIcon: (focused) => (
      <TouchableOpacity
        style={
          focused
            ? {
                padding: '40%',
                backgroundColor: colors?.purple,
                borderRadius: 100,
              }
              : {padding:0}
        }>
        <Profile width={String?.twentyFive} height={String?.twentyFive} />
      </TouchableOpacity>
    ),
  },
  {
    name: String?.historyScreen,
    component: History,
    tabBarLabel: String?.historyScreen,
    tabBarIcon: (focused) => (
      <TouchableOpacity
      style={
        focused
          ? {
              padding: '40%',
              backgroundColor: colors?.purple,
              borderRadius: 100,
            }
          : {padding:0}
      }>
      <HistoryIcon width={String?.twentyFive} height={String?.twentyFive} />
      </TouchableOpacity>
    ),
  },
  // Add more screens as needed
];
export const StackScreens = [
  {name: String?.LoginScreen, component: Login},
  {name: String?.OTPScreen, component: OTPScreen},
  {name: String?.tabScreen, component: BottomTab},
  {name: String?.historyScreen, component: History},
  // Add more screens as needed
];
export const profileImage = require('../assets/png/profile.png');
export const GrayProfileImage = require('../assets/png/grayProfile.png');
export const choresData = [
  {
    name: String?.housing,
    amount: '$570.75',
    percentage: '61%',
    color: colors?.purple,
  },
  {
    name: String?.food,
    amount: '$90.75',
    percentage: '21%',
    color: colors?.skyBlue,
  },
  {
    name: String?.saving,
    amount: '$780.75',
    percentage: '50%',
    color: colors?.wheat,
  },
];
export const EarningsData = [
  {
    name: String?.salary,
    amount: '$870.75',
    color: colors?.purple,
  },
  {
    name: String?.freelancing,
    amount: '$20.75',
    color: colors?.skyBlue,
  },
  {
    name: String?.interest,
    amount: '$400.75',
    color: colors?.wheat,
  },
];
export const purchasesData = [
  {
    name: String?.airbnb,
    date: String?.date,
    amount: '$450.75',
  },
  {
    name: String?.netflix,
    date: String?.date,
    amount: '$120.75',
  },
  {
    name: String?.spotify,
    date: String?.date,
    amount: '$70.75',
  },
  {
    name: String?.amazonPrime,
    date: String?.date,
    amount: '$80.75',
  },
];
export const pieData = [
  {
    value: 47,
    color: colors?.purple,
    gradientCenterColor: '#006DFF',
    focused: true,
  },
  {value: 40, color: colors?.skyBlue, gradientCenterColor: '#3BE9DE'},
  {value: 16, color: colors?.wheat, gradientCenterColor: '#8F80F3'},
];
