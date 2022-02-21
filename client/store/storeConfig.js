import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducersConfig/reducers";

const store = configureStore({
  reducer,
});

export default store;