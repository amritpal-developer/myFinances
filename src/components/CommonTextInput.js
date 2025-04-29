import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {OutlinedMode} from '../utils/String';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import {useState} from 'react';
import colors from '../utils/colors';
import CommonText from './CommonText';
const CommonTextInput = ({
  text,
  onChangeText,
  label,
  placeholder,
  left,
  right,
  Styles,
  autoFocus,
  maxLength,
  activeOutlineColor,
  textContentType,
  error,
  keyboardType,
  secureTextEntry,
}) => {
  const [focused, setFocused] = useState(false);
  // const theme = {
  //   roundness: responsiveScreenFontSize(1.5),
  //   colors: {
  //     primary: '#FFF',
  //     text: '#FFF',
  //     placeholder: 'rgba(255, 255, 255, 0.6)',
  //   },
  //   outlineColor: '#FFF',
  // };
  const theme = {
    ...DefaultTheme,
    roundness: responsiveScreenFontSize(1.5),
    colors: {
      ...DefaultTheme.colors,
      placeholder: 'rgba(255, 255, 255, 0.6)',
      text: '#FFF',
      primary: '#2196F3', // your primary color
    },
  };
  return (
    <TextInput
      autoFocus
      style={Styles || styles.input}
      maxLength={maxLength}
      mode={OutlinedMode || 'outlined'}
      label={
        <View style={{backgroundColor: 'transparent'}}>
          <Text style={[styles.labelText, styles.labelTextFocused]}>
            {' ' + label + ' '}
          </Text>
        </View>
      }
      outlineStyle={{
        borderWidth: responsiveScreenFontSize(0.2),
      }}
      textAlignVertical="center"
      textAlign="center"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor="rgba(255, 255, 255, 0.6)" // ✅ Light white with opacity
      theme={theme}
      secureTextEntry={secureTextEntry}
      activeOutlineColor={'white'}
      // activeOutlineColor={activeOutlineColor}
      contentStyle={styles.contentStyle}
      placeholder={placeholder}
      outlineColor="white"
      value={text}
      onChangeText={onChangeText}
      right={right}
      keyboardType={keyboardType || 'number-pad'}
      left={left}
      textContentType={textContentType}
      error={error}
    />
  );
};

export default CommonTextInput;
const styles = StyleSheet.create({
  contentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  input: {
    backgroundColor: 'transparent', // ✅ No background color to blend with the design
    fontSize: 16, // ✅ Adjust text size
    color: '#FFF', // ✅ Ensure text is visible
    width: '100%',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  labelContainer: {
    backgroundColor: 'transparent', // Default state
    paddingHorizontal: responsiveScreenFontSize(0.5),
  },
  labelFocused: {
    backgroundColor: 'rgba(20,143,203,255)', // ✅ Change label background when focused
    color: colors?.white,
  },
  labelText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: colors?.white,
    backgroundColor: 'rgba(20,143,203,255)',
  },
  labelTextFocused: {
    color: colors?.white, // ✅ Change text color when focused
  },
});
