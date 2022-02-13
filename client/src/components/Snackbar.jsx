import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";

import { setSnackbar } from "../../store/slices/snackbar";

export default function CustomizedSnackbar() {
  const open = useSelector((state) => state.ui.snackbar.open);
  const type = useSelector((state) => state.ui.snackbar.type);
  const message = useSelector((state) => state.ui.snackbar.message);

  const dispatch = useDispatch();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackbar({ open: false, type: "", message: "" }));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={type || "success"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
