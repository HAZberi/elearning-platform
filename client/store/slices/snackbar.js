import { createSlice } from "@reduxjs/toolkit";

const snackbar = createSlice({
  name: "snackbar",
  initialState: {
    open: true,
    type: "",
    message: "",
  },
  reducers: {
    setSnackbar: (snackbar, action) => {
      snackbar.open = action.payload.open;
      snackbar.type = action.payload.type;
      snackbar.message = action.payload.message;
    },
  },
});

export const { setSnackbar } = snackbar.actions;

export default snackbar.reducer;