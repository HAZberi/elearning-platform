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
  },
});

export const { setUser } = auth.actions;

export default auth.reducer;