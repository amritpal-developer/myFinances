import {LogBox, StyleSheet, Text, View, YellowBox} from 'react-native';
import React from 'react';
import {StackNavigation} from './src/navigation/StackNavigation';
LogBox.ignoreAllLogs();
const App = () => {
  return <StackNavigation />;
};

export default App;

const styles = StyleSheet.create({});
