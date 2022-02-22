import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import uiReducer from "./ui";
import authReducer from "../slices/auth";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export default combineReducers({
  ui: uiReducer,
  auth: persistedReducer,
});
