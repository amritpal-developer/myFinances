import Menu from '../assets/svg/Menu.svg';
import Dollar from '../assets/svg/Dollar.svg';
import Netflix from '../assets/svg/SocialIcon/netflix.svg';
import Spotify from '../assets/svg/SocialIcon/spotify.svg';
import Amazon from '../assets/svg/SocialIcon/amazon.svg';
import Airbnb from '../assets/svg/SocialIcon/airbnb.svg';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { height, width } from './data';
import colors from './colors';
import CommonText from '../components/CommonText';
import { String } from './String';
export function renderPurchases(item, index) {
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
            style={styles.choresText}
          />
        </View>
        <Text style={styles.choresText}>
          {amount[0]}.<Text style={styles.smallText}>{amount[1]}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export function renderEarnings({item, index}) {
  const amount = item?.amount?.split('.');
  return (
    <TouchableOpacity
      style={[styles.earningBox, {backgroundColor: colors?.blackMist}]}>
      <View style={styles.rowLayout}>
        <View style={{marginRight: '25%'}}>
          <Dollar width={String?.forty} height={String?.forty} />
        </View>
        <Menu width={String?.forty} height={String?.forty} />
      </View>
      <CommonText label={item?.name} style={styles.choresText} />
      <Text style={styles.choresText}>
        {amount[0]}.<Text style={styles.smallText}>{amount[1]}</Text>
      </Text>
    </TouchableOpacity>
  );
}
export function renderChores({item, index}) {
  const amount = item?.amount?.split('.');
  return index == 0 ? (
    <TouchableOpacity style={styles.addBox} onPress={{}}>
      <CommonText label={'+'} style={{color: 'white', fontSize: 30}} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[styles.choresBox, {backgroundColor: item?.color}]}>
      <CommonText label={item?.name} style={styles.choresText} />
      <Text style={styles.choresText}>
        {amount[0]}.<Text style={styles.smallText}>{amount[1]}</Text>
      </Text>
      <CommonText label={item?.percentage} style={styles.percentageText} />
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
    borderColor: 'white',
  },
  purchaseLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  columnLayout: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentageBox: {
    padding: '3%',
    borderRadius: 20,
    backgroundColor: colors?.gray,
  },
  choresBox: {
    backgroundColor: colors?.blue,
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
    backgroundColor: colors?.blue,
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
    color: colors?.white,
    marginHorizontal: '5%',
    fontSize: 17,
  },
  percentageText: {
    padding: '3%',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: colors?.white,
    paddingHorizontal: '8%',
  },
});
