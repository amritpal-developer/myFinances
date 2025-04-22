import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackNavigation} from './StackNavigation';
import LoadingScreen from '../screens/LoadingScreen';
const Route = ({initialRouteName}) => {
  return (
    <StackNavigation initialRouteName={initialRouteName} />
  )
};

export default Route;

const styles = StyleSheet.create({});
