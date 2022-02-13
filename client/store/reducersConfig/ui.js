import { combineReducers } from "redux";

import snackbarReducer from "../slices/snackbar";

export default combineReducers({
  snackbar: snackbarReducer,
});