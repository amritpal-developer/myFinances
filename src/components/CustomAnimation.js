import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
const CustomAnimation = ({source, autoPlay, loop, style}) => {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={source} // Add animation JSON file
        autoPlay={autoPlay || false}
        loop={loop || false}
        style={style || styles.animation}
      />
    </SafeAreaView>
  );
};

export default CustomAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});
