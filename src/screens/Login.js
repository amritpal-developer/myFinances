import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {String} from '../utils/String';
import {Regex} from '../utils/Regex';
import LottieView from 'lottie-react-native';
import CommonTextInput from '../components/CommonTextInput';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Button from '../components/Button';
import {googleSignIn, signIn, signUp} from '../utils/auth';
import CommonText from '../components/CommonText';
import Google from '../assets/svg/SocialIcon/google.svg';
const {width, height} = Dimensions.get('window');
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const [verificationId, setVerificationId] = useState(null);
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const verifyOtp = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth().signInWithCredential(credential);
      Alert.alert('Success', 'You are successfully authenticated.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid OTP. Try again.');
    }
  };
  const handleLogin = () => {
    // Implement your login logic here
    if (phoneNumber && phoneNumber.length == 10) {
      console.log('Logging in with:', email, password);
      navigation.navigate(String?.tabScreen);
    } else if (phoneNumber && phoneNumber.length < 10) {
      Alert.alert(String?.validNumber);
    } else if (!phoneNumber) {
      Alert.alert(String?.EnterPhone);
    }
  };
  const validate = () => {
    // Implement your login logic here
    if (Regex(String?.email, email) && !Regex(String?.password, password)) {
      Alert.alert(String?.validEmail);
    } else if (
      !Regex(String?.email, email) &&
      Regex(String?.password, password)
    ) {
      Alert.alert(String?.validEmail);
    } else if (
      Regex(String?.email, email) &&
      Regex(String?.password, password)
    ) {
      const response = signUp(email, password);
      console.log('response', response);
      // navigation.navigate(String?.tabScreen);
    }
  };
  function verifyPhoneNumber() {
    if (phoneNumber.length == 10) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }
  const handleGoogleSignIn = async () => {
    const response = await googleSignIn();
    if (response.success) {
      Alert.alert(response.user);
      console.log('User Info:', response.user);
      navigation.navigate(String?.tabScreen);
    } else {
      Alert.alert(response.error);
      console.error('Error:', response.error);
    }
  };
  const sendVerificationCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91 ${phoneNumber}`,
      );
      Alert.alert('Verification code sent to your phone.');
      navigation.navigate(String?.OTPScreen, {
        mobile: phoneNumber,
        verificationId: confirmation?.verificationId,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <LinearGradient
      colors={['#29ABE2', '#0077B7']} // Gradient background
      style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        {/* <Image
          source={require('./assets/your_logo.png')} // Replace with your logo
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <View style={styles.logo}>
          <LottieView
            style={styles.logo}
            source={require('../assets/Animations/business.json')}
            autoPlay
            loop
          />
        </View>
        <View style={styles.inputContainer}>
          {/* <CommonTextInput
            Styles={styles.textInput}
            text={phoneNumber}
            label={String?.PhoneLabel}
            activeOutlineColor={'rgba(255, 255, 255, 0.3)'}
            maxLength={String?.CountTen}
            placeHolder={String?.PhonePlaceHolder}
            autoFocus={String?.trueBoolean}
            textContentType={String?.TelephoneNumberText}
            left={
              <TextInput.Affix
                text={String?.CountryCode}
                textStyle={styles.codeStyle}
              />
            }
            onChangeText={phoneNumber => {
              setPhoneNumber(phoneNumber);
              verifyPhoneNumber();
            }}
          /> */}
          <CommonTextInput
            Styles={styles.textInput}
            text={email}
            label={String?.email}
            activeOutlineColor={'rgba(255, 255, 255, 0.3)'}
            placeHolder={String?.PhonePlaceHolder}
            textContentType={String?.TelephoneNumberText}
            onChangeText={email => {
              setEmail(email);
            }}
          />
          <CommonTextInput
            Styles={styles.textInput}
            text={password}
            label={String?.PasswordPlaceHolder}
            activeOutlineColor={'rgba(255, 255, 255, 0.3)'}
            maxLength={String?.CountTen}
            placeHolder={String?.PhonePlaceHolder}
            secureTextEntry={showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? String?.eyeIcon : String?.eyeOffIcon}
                color={colors?.white}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            textContentType={String?.TelephoneNumberText}
            onChangeText={password => setPassword(password)}
          />
          <Button
            style={styles.button}
            pressFunction={validate}
            label={String?.LoginScreen}
            labelStyle={styles.buttonText}
          />
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>{String?.NoAccount}</Text>
          <TouchableOpacity>
            <Text style={[styles.signupText, {fontWeight: 'bold'}]}>
              {String?.SignUp}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.googlepressableView}>
          <TouchableOpacity style={styles.googlePressable} onPress={handleGoogleSignIn}>
            <View style={styles.googleImage}>
              <Google style={styles.googlestyle} />
              <CommonText label={String?.google} style={styles.googleText} />
            </View>
          </TouchableOpacity>

          {Platform.OS == 'ios' && (
            <TouchableOpacity style={styles.applePressable} onPress={{}}>
              <View style={styles.facebookImage}>
                <AntDesign name="apple1" size={18} />
                <CommonText label={String?.apple} style={styles.googleText} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: '5%',
  },
  input: {
    backgroundColor: 'transparent', // ✅ No background color to blend with the design
    fontSize: 16, // ✅ Adjust text size
    color: '#FFF', // ✅ Ensure text is visible
    width: '100%',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5%',
  },
  applePressable: {
    flex: 1,
    height: responsiveHeight(6),
    borderRadius: responsiveScreenFontSize(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: colors?.white,
  },
  countryCodeView: {
    backgroundColor: 'red',
    flex: 1,
  },
  googleText: {
    color: colors?.black,
    fontSize: 11,
  },
  facebookImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  facebookstyle: {
    width: responsiveScreenWidth(5),
    aspectRatio: 1,
  },
  googlepressableView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: '2%',
    justifyContent: 'center',
    marginVertical:'5%'
  },
  googlePressable: {
    // flex: 1,
    backgroundColor: colors?.white,
    height: responsiveHeight(6),
    width: '50%',
    borderRadius: responsiveScreenFontSize(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '2%',
    borderColor: '#EA4335',
    borderWidth: 2,
  },
  googleImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  googlestyle: {
    width: responsiveScreenWidth(5),
    aspectRatio: 1,
  },
  codeStyle: {
    fontWeight: '500',
    textAlign: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    color: colors?.white,
  },
  logo: {
    // flex:1,
    width: width * 0.6, // Adjust logo size based on screen width
    height: height * 0.3,
    marginBottom: 30,
    resizeMode: 'cover',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: '#fff', // White text color
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0077B7', // Dark blue text
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordButton: {
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: 'white',
  },
});

export default React.memo(Login);
