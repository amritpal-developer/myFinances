import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {String} from '../utils/String';
import {Regex} from '../utils/Regex';
import LottieView from 'lottie-react-native';
import CommonTextInput from '../components/CommonTextInput';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import colors from '../utils/colors';
const {width, height} = Dimensions.get('window');
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', email, password);
    if (email && password) {
      navigation.navigate(String?.tabScreen);
    } else if (!email && password) {
      Alert.alert(String?.EnterEmail);
    } else if (!password && email) {
      Alert.alert(String?.EnterPassword);
    } else {
      Alert.alert(String?.EnterRequiredDetails);
    }
  };
  function verifyPhoneNumber() {
    if (phoneNumber.length == 9) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }
  const sendVerificationCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91${phoneNumber}`,
      );
      Alert.alert('Verification code sent to your phone.');
      navigation.navigate(OTPscreen, {
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
          <CommonTextInput
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
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>{String?.LoginScreen}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>
              {String?.ForgotPassword}
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>{String?.NoAccount}</Text>
          <TouchableOpacity>
            <Text style={[styles.signupText, {fontWeight: 'bold'}]}>
              {String?.SignUp}
            </Text>
          </TouchableOpacity>
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
  countryCodeView: {
    backgroundColor: 'red',
    flex: 1,
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
