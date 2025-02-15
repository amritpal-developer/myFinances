import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';

const Button = ({
  label,
  image,
  style,
  imageStyle,
  labelStyle,
  pressFunction,
}) => {
  return (
    <TouchableOpacity
      style={style ? style : ''}
      onPress={pressFunction ? pressFunction : {}}>
      {label ? (
        <Text style={labelStyle}>{label}</Text>
      ) : (
        <Image source={image} style={imageStyle} />
      )}
    </TouchableOpacity>
  );
};
export default Button;
const styles = StyleSheet.create({});
