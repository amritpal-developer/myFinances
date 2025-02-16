import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {OutlinedMode} from '../utils/String';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import {useState} from 'react';
import colors from '../utils/colors';
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
}) => {
  const [focused, setFocused] = useState(false);
  const theme = {
    roundness: responsiveScreenFontSize(2),
    colors: {
      primary: 'white',
      text: 'white',
      placeholder: 'white',
      background: 'white',
    },
  };
  return (
    <TextInput
      autoFocus={false}
      style={Styles||styles.input}
      maxLength={maxLength}
      mode={OutlinedMode || 'outlined'}
      label={
        <View style={[styles.labelContainer, focused && styles.labelFocused]}>
          <Text style={[styles.labelText, focused && styles.labelTextFocused]}>
            {label}
          </Text>
        </View>
      }
      textAlignVertical="center"
      textAlign="center"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor="rgba(255, 255, 255, 0.6)" // ✅ Light white with opacity
      theme={{
        roundness: 10,
        colors: {
          primary: '#FFF',
          text: '#FFF',
          placeholder: 'rgba(255, 255, 255, 0.6)',
        },
      }}
      // activeOutlineColor={activeOutlineColor}
      contentStyle={styles.contentStyle}
      placeholder={placeholder}
      // outlineColor='rgba(255, 255, 255, 0.3)'

      value={text}
      onChangeText={onChangeText}
      // right={right}
      keyboardType={keyboardType || 'number-pad'}
      // left={left}
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
    paddingHorizontal: 4,
  },
  labelFocused: {
    backgroundColor: '#3498DB', // ✅ Change label background when focused
    borderRadius: 4,
    color: colors?.white,
  },
  labelText: {
    fontSize: 14,
    color: colors?.white,
  },
  labelTextFocused: {
    color: colors?.white, // ✅ Change text color when focused
  },
});
