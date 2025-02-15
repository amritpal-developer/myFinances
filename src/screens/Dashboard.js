import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const Dashboard = () => {
  return (
    <LinearGradient
      colors={['#29ABE2', '#0077B7']} // Gradient background
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <PieChart
            data={data}
            width={screenWidth}
            height={screenHeight*0.3}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            // paddingLeft={'15'}
            center={[10, 50]}
            absolute
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default React.memo(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
