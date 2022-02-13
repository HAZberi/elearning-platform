import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbar() {
  const [open, setOpen] = React.useState(true);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
        severity="success"
      >
        This is a success message!
      </Alert>
    </Snackbar>
  );
}
