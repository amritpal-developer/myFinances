import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { height } from '../utils/data';
const Dashboard = ({navigation}) => {
  const [selected, setSelected] = useState('');
  return (
    <LinearGradient
      colors={['#29ABE2', '#0077B7']} // Gradient background
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Calendar
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#dd99ee'
          }}
        style={styles.container}
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default React.memo(Dashboard);

const styles = StyleSheet.create({
  container: {
    height:height,
    // backgroundColor:'#29ABE2'

  },
});
