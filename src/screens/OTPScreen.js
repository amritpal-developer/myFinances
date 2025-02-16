import {SafeAreaView, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import CommonText, {TextStyles} from '../Components/CommonText';
import {OtpInput} from 'react-native-otp-entry';
import {
  BottomTabScreen,
  Continue,
  CountThirty,
  DidNotReceive,
  EnterOTP,
  HomeScreen,
} from '../Utils/string';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import CommonBtn from '../Components/CommonBtn';
import theme from '../Utils/theme';
import {sendVerification, verifyCode} from '../Service/PhoneAuth/Auth';
import OTPTimer from '../Components/OTPTimer';
const OTPScreen = ({route, navigation}) => {
  const {mobile,verificationId} = route?.params;
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [btnDisable, setBtnDisable] = useState(true);
  const [ResendVerificationId, setResendVerificationId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const checkPhoneVerification = async () => {
    const user = auth().currentUser;
    if (user && user.phoneNumber === `+91${mobile}`) {
      setIsVerified(true);
      Alert.alert(
        'Phone Number Already Verified',
        'Navigating to the next screen...',
      );
      navigation.navigate(BottomTabScreen); // replace with your next screen's name
    } else {
      ResendCode();
    }
  };
  async function confirmCode() {
    try {
      // const credential = auth.PhoneAuthProvider.credential(
      //   verificationId,
      //   code,
      // );
      // await auth().signInWithCredential(credential);
      Alert.alert('Phone Number Verified Successfully');
      navigation.navigate(BottomTabScreen); // replace with your next screen's name
    } catch (error) {
      Alert.alert('Invalid Code', error.message);
    }
  }
  async function ResendCode() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${mobile}`);
      setResendVerificationId(confirmation.verificationId);
      console.log("fa2",confirmation?.verificationId);
      Alert.alert('Verification code sent to your phone.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  return (
    console.log("fa",verificationId),
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <CommonText
          Styles={TextStyles?.headerTitleText}
          text={`${EnterOTP}${mobile ? mobile : ''}`}
        />
        <OtpInput
          numberOfDigits={6}
          focusColor="orange"
          focusStickBlinkingDuration={500}
          onTextChange={text => {
            setCode(text);
            setBtnDisable(true);
          }}
          onFilled={text => {
            console.log(`OTP is ${text}`);
            setBtnDisable(false);
          }}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
          theme={{
            containerStyle: styles.OTPcontainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />
        <CommonBtn
          onPress={confirmCode}
          label={Continue}
          disableBoolean={btnDisable}
          Styles={styles.btn}
        />
        <OTPTimer initialTime={CountThirty} onResend={ResendCode} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(OTPScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  OTPcontainer: {
    flex: 1,
    marginVertical:'2%',
    backgroundColor: 'white',
  },
  OTPView: {
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(10),
    alignSelf: 'flex-start',
  },
  scrollView: {
    marginHorizontal: '5%',
    marginTop: '5%',
  },

  borderStyleHighLighted: {
    borderColor: theme?.colors?.orange,
  },
  underlineStyleBase: {
    width: responsiveScreenHeight(5),
    height: responsiveScreenHeight(5.5),
    borderWidth: responsiveFontSize(0.3),
    borderRadius: responsiveScreenFontSize(1),
  },

  underlineStyleHighLighted: {
    borderColor: theme?.colors?.orange,
  },
  didNotReceiveView: {
    fontSize: responsiveScreenFontSize(2),
    color: theme?.colors?.gray,
    marginTop: '3%',
  },
});