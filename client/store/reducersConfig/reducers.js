import { combineReducers } from "redux";

import uiReducer from "./ui";
import authReducer from "../slices/auth";

export default combineReducers({
  ui: uiReducer,
  auth: authReducer,
});
