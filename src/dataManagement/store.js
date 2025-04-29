import {configureStore} from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    image: imageReducer,
    theme: themeReducer,
    userDetails: userReducer,
  },
});
