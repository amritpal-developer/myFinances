import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: null,
    email: null,
    fullName: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.fullName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
