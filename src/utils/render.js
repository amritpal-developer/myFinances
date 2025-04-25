import Menu from '../assets/svg/lightTheme/Menu.svg';
import DarkMenu from '../assets/svg/darkTheme/darkMenu.svg';
import Dollar from '../assets/svg/lightTheme/Dollar.svg';
import Netflix from '../assets/svg/SocialIcon/netflix.svg';
import Spotify from '../assets/svg/SocialIcon/spotify.svg';
import Amazon from '../assets/svg/SocialIcon/amazon.svg';
import Airbnb from '../assets/svg/SocialIcon/airbnb.svg';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {height, width} from './data';
import colors from './colors';
import CommonText from '../components/CommonText';
import {String} from './String';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
export function renderPurchases(item, index, isDarkMode) {
  const amount = item?.amount?.split('.');
  return (
    <TouchableOpacity style={[styles.purchaseBox]} key={index}>
      <View style={styles.purchaseLayout}>
        <View style={styles.rowLayout}>
          {item.name == String?.airbnb ? (
            <Airbnb width={String?.forty} height={String?.forty} />
          ) : item.name == String?.netflix ? (
            <Netflix width={String?.forty} height={String?.forty} />
          ) : item.name == String?.spotify ? (
            <Spotify width={String?.forty} height={String?.forty} />
          ) : item.name == String?.amazonPrime ? (
            <Amazon width={String?.forty} height={String?.forty} />
          ) : (
            <Dollar width={String?.forty} height={String?.forty} />
          )}
          <CommonText
            label={item?.name + '\n' + item?.date}
            style={[
              styles.choresText,
              {color: isDarkMode ? colors?.white : colors?.black},
            ]}
          />
        </View>
        <Text
          style={[
            styles.choresText,
            {color: isDarkMode ? colors?.white : colors?.black},
          ]}>
          {amount[0]}.<Text style={styles.smallText}>{amount[1]}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export function renderEarnings({item, index, isDarkMode}) {
  const amount = item?.amount?.split('.');
  return (
    <TouchableOpacity
      style={[
        styles.earningBox,
        {backgroundColor: isDarkMode ? colors?.blackMist : colors?.grayWhite},
      ]}>
      <View style={styles.rowLayout}>
        <View style={styles.dollarIcon}>
          <Dollar width={String?.forty} height={String?.forty} />
        </View>
        {isDarkMode ? (
          <Menu width={String?.forty} height={String?.forty} />
        ) : (
          <DarkMenu width={String?.forty} height={String?.forty} />
        )}
      </View>
      <CommonText
        label={item?.name}
        style={[
          styles.choresText,
          {color: isDarkMode ? colors?.white : colors?.black},
        ]}
      />
      <Text
        style={[
          styles.choresText,
          {color: isDarkMode ? colors?.white : colors?.black},
        ]}>
        {amount[0]}.
        <Text
          style={[
            styles.smallText,
            {color: isDarkMode ? colors?.white : colors?.black},
          ]}>
          {amount[1]}
        </Text>
      </Text>
    </TouchableOpacity>
  );
}
export function renderChores({item, index, isDarkMode,openModal}) {
  const amount = item?.amount?.split('.');
  return index == 0 ? (
    (console.log('isDark', isDarkMode),
    (
      <TouchableOpacity
        style={[
          styles.addBox,
          {borderColor: isDarkMode ? colors?.white : colors?.black},
        ]}
        onPress={openModal}>
        <CommonText
          label={'+'}
          style={[
            styles.plus,
            {color: isDarkMode ? colors?.white : colors?.black},
          ]}
        />
      </TouchableOpacity>
    ))
  ) : (
    <TouchableOpacity
      style={[styles.choresBox, {backgroundColor: item?.color}]}>
      <CommonText
        label={item?.name}
        style={[
          styles.choresText,
          {color: index != 1 ? colors?.black : colors?.white},
        ]}
      />
      <Text
        style={[
          styles.choresText,
          {color: index != 1 ? colors?.black : colors?.white},
        ]}>
        {amount[0]}.
        <Text
          style={[
            styles.smallText,
            {color: index != 1 ? colors?.black : colors?.white},
          ]}>
          {amount[1]}
        </Text>
      </Text>
      <CommonText
        label={item?.percentage}
        style={[
          styles.percentageText,
          {color: index != 1 ? colors?.black : colors?.white},
        ]}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  addBox: {
    borderRadius: 10,
    height: height * 0.16,
    width: width * 0.15,
    marginRight: '5%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '18%',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  dollarIcon: {marginRight: '25%'},
  plus: {
    fontSize: responsiveScreenFontSize(3),
  },
  purchaseLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  smallText: {
    fontSize: responsiveScreenFontSize(1.5),
  },
  columnLayout: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentageBox: {
    padding: '3%',
    borderRadius: 20,
  },
  choresBox: {
    borderRadius: 16,
    height: height * 0.16,
    width: width * 0.3,
    marginRight: '5%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '10%',
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  earningBox: {
    borderRadius: 16,
    height: height * 0.16,
    width: width * 0.4,
    marginRight: '5%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '10%',
  },
  purchaseBox: {
    borderRadius: 16,
    height: height * 0.07,
    width: width * 0.9,
    justifyContent: 'center',
    marginVertical: '2%',
  },
  choresText: {
    marginHorizontal: '5%',
    fontSize: 17,
  },
  percentageText: {
    padding: '3%',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: '8%',
  },
});
