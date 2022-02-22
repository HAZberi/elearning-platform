import store from "../../store/storeConfig";
import Router from "next/router";
import { setSnackbar } from "../../store/slices/snackbar";
import { logout } from "../../store/slices/auth";
import apiCall from "./apiConfig";

const dispatch = store.dispatch;

const signout = async () => {
  try {
    const response = await apiCall.get("/user/logout");

    dispatch(logout());

    dispatch(
      setSnackbar({
        open: true,
        type: "success",
        message: response.data.message,
      })
    );

    Router.push("/login");
  } catch (err) {
    dispatch(
      setSnackbar({
        open: true,
        type: "error",
        message: err.response.data.message,
      })
    );
  }
};

export default signout;