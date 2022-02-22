import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "../utils/createStorage";

import uiReducer from "./ui";
import authReducer from "../slices/auth";

const persistConfig = {
  key: "auth",
  storage,
  timeout: 100,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export default combineReducers({
  ui: uiReducer,
  auth: persistedReducer,
});
