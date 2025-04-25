import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import CommonText from '../components/CommonText';
import {PieChart} from 'react-native-gifted-charts';
import colors from '../utils/colors';
import {String} from '../utils/String';
import CommonFlatList from '../components/CommonFlatList';
import Button from '../components/Button';
import {
  EarningsData,
  categoryOptions,
  choresData,
  currentMonth,
  darkTheme,
  height,
  pieData,
  purchasesData,
  width,
} from '../utils/data';
import {renderChores, renderEarnings, renderPurchases} from '../utils/render';
import {CommonModal} from '../components/CommonModal';
import {useTheme as useCustomTheme} from '../utils/ThemeProvider';
import { useSelector } from 'react-redux';
import { toggleTheme } from '../dataManagement/slices/themeSlice';
const Home = ({navigation}) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [modalVisible, setModalVisible] = React.useState(false);
  const addItems = [{name: 'Add Items'}];
  // Function to open modal
const openModal = () => setModalVisible(true);
  const totalAmount = choresData
    .map(item => parseFloat(item.amount.replace('$', ''))) // Remove $ and convert to number
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2)
    .split('.');
  function centerLabelComponent() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: isDarkMode ? colors?.white : colors?.black,
            fontWeight: 'bold',
          }}>
          47%
        </Text>
      </View>
    );
  }
  const handleAddExpense = data => {
    console.log('Added Expense:', data);
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? colors.black : colors?.white},
      ]}>
      <ScrollView
        style={[
          styles.scrollContainer,
          {backgroundColor: isDarkMode ? colors.black : colors?.white},
        ]}
        showsVerticalScrollIndicator={false}>
        <CommonModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          typeOfModal={String?.ImagePickerType}
          onSubmit={handleAddExpense}
          categoryList={categoryOptions}
        />
        <View style={styles.rowLayout}>
          <View style={styles.columnLayout}>
            <CommonText
              label={`${String?.expenses}`}
              style={[
                styles.expenseText,
                {color: isDarkMode ? colors?.white : colors?.black},
              ]}
            />
            <Text
              style={[
                styles.amountText,
                {color: isDarkMode ? colors?.white : colors?.black},
              ]}>
              {`$${totalAmount[0]}`}.
              <Text
                style={[
                  styles.smallAmountText,
                  {color: isDarkMode ? colors?.white : colors?.black},
                ]}>
                {totalAmount[1]}
              </Text>
            </Text>
          </View>
          <View style={styles.pieChartView}>
            <PieChart
              data={pieData}
              donut
              showGradient
              semiCircle
              sectionAutoFocus
              radius={String?.seventy}
              innerRadius={String?.fiftyFive}
              innerCircleColor={!isDarkMode ? colors?.white : colors?.black}
              centerLabelComponent={centerLabelComponent}
            />
          </View>
        </View>
        <CommonFlatList
          renderItem={({ item, index }) =>
            renderChores({ item, index, isDarkMode, openModal })
          }
          contentContainerStyle={styles.contentContainerStyle}
          data={addItems.concat(choresData)}
          horizontalFlag={true}
        />
        <CommonText
          label={String?.incomeTitle}
          style={[
            styles.expenseText,
            {color: isDarkMode ? colors?.white : colors?.black},
          ]}
        />
        <CommonFlatList
          renderItem={({item, index}) => renderEarnings({item, index, isDarkMode})}
          data={EarningsData}
          contentContainerStyle={styles.contentContainerStyle}
          horizontalFlag={true}
        />
        <CommonText
          label={`${currentMonth} ${String?.Spend}`}
          style={[
            styles.expenseText,
            {color: isDarkMode ? colors?.white : colors?.black},
          ]}
        />
        {purchasesData?.map((item, index) =>
          renderPurchases(item, index, isDarkMode),
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pieChartView: {padding: 20, alignItems: 'center'},
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
