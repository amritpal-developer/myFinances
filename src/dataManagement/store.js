import { configureStore } from '@reduxjs/toolkit'
import imageReducer from './slices/imageSlice';
import themeReducer from './slices/themeSlice';
export const store = configureStore({
  reducer: {
    image: imageReducer,
    theme:themeReducer
  },
})