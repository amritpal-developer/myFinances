import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../utils/ThemeProvider';

const FONT_WEIGHTS = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  light: 'Poppins-Light',
  thin: 'Poppins-Thin',
  bold: 'Poppins-Bold',
};

const VARIANTS = {
  h1: { size: 32, weight: 'bold' },
  h2: { size: 28, weight: 'bold' },
  h3: { size: 24, weight: 'medium' },
  body1: { size: 16, weight: 'regular' },
  body2: { size: 14, weight: 'regular' },
  caption: { size: 12, weight: 'light' },
  small: { size: 10, weight: 'thin' },
};

const isColorDark = (hexColor) => {
  if (!hexColor || hexColor.length < 6) return false;
  const color = hexColor.replace('#', '');
  const r = parseInt(color.substring(0,2), 16);
  const g = parseInt(color.substring(2,4), 16);
  const b = parseInt(color.substring(4,6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 155;
};

const CommonText = ({
  label, // 👈 added label prop
  children,
  variant = 'body1',
  color,
  backgroundColor,
  style,
  numberOfLines,
  ...props
}) => {
  const { isDarkMode } = useTheme();
  const { size, weight } = VARIANTS[variant] || VARIANTS.body1;

  let finalColor = color;

  if (!finalColor) {
    if (backgroundColor) {
      finalColor = isColorDark(backgroundColor) ? '#FFFFFF' : '#000000';
    } else {
      finalColor = isDarkMode ? '#FFFFFF' : '#000000';
    }
  }

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: FONT_WEIGHTS[weight] || FONT_WEIGHTS.regular,
          fontSize: size,
          color: finalColor,
        },
        style,
      ]}
      {...props}
    >
      {label || children} {/* 👈 Prefer label, fallback to children */}
    </Text>
  );
};

export default CommonText;
