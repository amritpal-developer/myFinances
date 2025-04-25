import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native';
import {
  MD3DarkTheme as PaperDark,
  MD3LightTheme as PaperLight,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDark,
  DefaultTheme as NavigationLight,
} from '@react-navigation/native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
console.log("apperance",colorScheme);
  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });
    return () => sub.remove();
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const combinedTheme = isDarkMode
    ? { ...PaperDark, ...NavigationDark, colors: { ...PaperDark.colors, ...NavigationDark.colors } }
    : { ...PaperLight, ...NavigationLight, colors: { ...PaperLight.colors, ...NavigationLight.colors } };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme: combinedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
