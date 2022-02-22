import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: {},
    token: "",
  },
  reducers: {
    setUser: (auth, action) => {
      auth.user = action.payload.user;
      auth.isLoggedIn = true;
    },
    logout: (auth, _) => {
      auth.user = {};
      auth.isLoggedIn = false;
      auth.token = "";
    },
  },
});

export const { setUser, logout } = auth.actions;

export default auth.reducer;
