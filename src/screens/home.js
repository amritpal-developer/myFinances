import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CommonText from '../components/CommonText';
import {PieChart} from 'react-native-gifted-charts';
import colors from '../utils/colors';
import {String} from '../utils/String';
import CommonFlatList from '../components/CommonFlatList';
import Button from '../components/Button';
import {
  EarningsData,
  choresData,
  currentMonth,
  darkTheme,
  height,
  pieData,
  purchasesData,
  width,
} from '../utils/data';
import {renderChores, renderEarnings, renderPurchases} from '../utils/render';

const Home = ({navigation}) => {
  const addItems = [{name: 'Add Items'}];
  const totalAmount = choresData
    .map(item => parseFloat(item.amount.replace('$', ''))) // Remove $ and convert to number
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2)
    .split('.');
  function centerLabelComponent() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
          47%
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: darkTheme ? darkTheme : 'black'},
      ]}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>

        <View style={styles.rowLayout}>
          <View style={styles.columnLayout}>
            <CommonText
              label={`${String?.expenses}`}
              style={[styles.expenseText, {color: 'white'}]}
            />
            <Text style={styles.amountText}>
              {`$${totalAmount[0]}`}.
              <Text style={styles.smallAmountText}>{totalAmount[1]}</Text>
            </Text>
          </View>
          <View style={{padding: 20, alignItems: 'center'}}>
            <PieChart
              data={pieData}
              donut
              showGradient
              semiCircle
              sectionAutoFocus
              radius={String?.seventy}
              innerRadius={String?.fiftyFive}
              innerCircleColor={colors?.black}
              centerLabelComponent={centerLabelComponent}
            />
          </View>
        </View>
        <CommonFlatList
          renderItem={(item, index) => renderChores(item, index)}
          contentContainerStyle={styles.contentContainerStyle}
          data={addItems.concat(choresData)}
          horizontalFlag={true}
        />
        <CommonText
          label={String?.incomeTitle}
          style={[styles.expenseText, {color: 'white'}]}
        />
        <CommonFlatList
          renderItem={(item, index) => renderEarnings(item, index)}
          data={EarningsData}
          contentContainerStyle={styles.contentContainerStyle}
          horizontalFlag={true}
        />
        <CommonText
          label={`${currentMonth} ${String?.Spend}`}
          style={[styles.expenseText, {color: 'white'}]}
        />
        {purchasesData?.map((item, index) => renderPurchases(item, index))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnLayout: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagePickerModal: {
    width: width,
  },
  contentContainerStyle: {
    paddingRight: 60,
  },
  amountText: {
    fontSize: 30,
    color: colors?.white,
    marginTop: '5%',
    fontWeight: '600',
  },
  expenseText: {
    fontSize: 20,
  },
  smallText: {
    fontSize: 12,
  },
  smallAmountText: {
    fontSize: 20,
  },
  scrollContainer: {
    marginHorizontal: '5%',
  },

  incomeTitleStyle: {
    fontSize: 20,
  },
});
