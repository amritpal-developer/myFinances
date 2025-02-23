import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import CommonText from './CommonText';
import { String } from '../utils/String';
import colors from '../utils/colors';

const OTPTimer = ({initialTime = 30, onResend}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setIsButtonDisabled(false);
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(initialTime);
    setIsButtonDisabled(true);
    onResend();
  };

  return (
    <View style={styles.container}>
      <CommonText
        Styles={styles.timerText}
        text={
          isButtonDisabled
            ? `${String?.DidNotReceiveWithTimer}0:${timeLeft}`
            : String?.DidNotReceiveWithOutTimer
        }
      />
      {!isButtonDisabled ? (
        <Button
          style={styles.btn}
          title={String?.resendOTPText}
          onPress={handleResend}
          disabled={isButtonDisabled}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  timerText: {
    marginTop: '3%',
    fontSize: responsiveScreenFontSize(2),
    color: colors?.gray,
  },
  btn: {
    marginTop: '3%',
    color:colors?.green
  },
});

export default OTPTimer;