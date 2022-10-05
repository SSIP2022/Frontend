import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userData: {},
    role: "",
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.isLogin = action.payload.success;
      state.userData = action.payload.user;
      state.role = action.payload.user.role;
    },
  
  },
});

export const { setUserLogin} = userSlice.actions;

export const user = (state) => state.user;

export default userSlice.reducer;
