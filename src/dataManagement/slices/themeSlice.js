// src/dataManagement/slices/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { String } from '../../utils/String';

const initialState = {
  isDarkMode: Appearance.getColorScheme() === 'dark',
};
console.log("apperance",Appearance.getColorScheme());
const themeSlice = createSlice({
  name: String?.theme,
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
