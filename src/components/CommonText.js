import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CommonText = ({label,style}) => {
  return <Text style={style}>{label}</Text>;
};

export default CommonText;

const styles = StyleSheet.create({});
