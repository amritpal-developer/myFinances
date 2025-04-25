import { createSlice } from '@reduxjs/toolkit';
import { String } from '../../utils/String';
const imageSlice = createSlice({
  name: String?.image,
  initialState: { uri: null },
  reducers: {
    setImageUri: (state, action) => {
      state.uri = action.payload;
    },
  },
});
export const { setImageUri } = imageSlice.actions;
export default imageSlice.reducer;
