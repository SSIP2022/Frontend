import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userData: {},
    role: "",
    token: null,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.isLogin = action.payload.success;
      state.userData = action.payload.user;
      state.role = action.payload.user.role;
    },

    setToken: (state, action) => {
      state.token = action.payload || state.token;
    },
    setUserLogout: (state) => {
      state.isLogin = false;
      state.userData = {};
      state.role = "";
      state.token = null;
    },
  },
});

export const { setUserLogin, setUserLogout, setToken } = userSlice.actions;

export const user = (state) => state.user;

export default userSlice.reducer;
