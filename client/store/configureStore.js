import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducersConfig/reducers";

export default function () {
  return configureStore({
    reducer,
  });
}
