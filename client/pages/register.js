import * as React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { setSnackbar } from "../store/slices/snackbar";
import apiCall from "../src/utils/apiConfig";
import createErrorMsg from "../src/utils/errorMessageUI";
import Link from "../src/utils/Link";

const Register = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "Hassaan",
    email: "mhazuberi@gmail.com",
    password: "1161001az",
    confirmPassword: "1161001az",
  };

  const validationSchema = Yup.object({
    name: Yup.string("Enter you name").required("Name is required"),
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirmPassword: Yup.string("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must be the same")
      .required("Password confirmation is required"),
  });

  const handleSubmit = async ({ name, email, password }, { resetForm }) => {
    try {
      await apiCall.post("/user/register", {
        name,
        email,
        password,
      });
    } catch (err) {
      //UI Error Handling Required here
      dispatch(
        setSnackbar({
          open: true,
          type: "error",
          message: createErrorMsg(err.response.data.message),
        })
      );
    }
    resetForm();
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ my: 5, pb: 10 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid
                container
                direction="column"
                spacing={2}
                justifyContent="center"
              >
                <Grid item sx={{ mt: 3, mb: 1, textAlign: "center" }}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Register
                  </Typography>
                </Grid>
                <Grid item sx={{ mx: 4 }}>
                  <TextField
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    label="Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ mx: 4 }}>
                  <TextField
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ mx: 4 }}>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    label="Password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ mx: 4 }}>
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item sx={{ mx: 4, my: 2 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                  >
                    {isSubmitting ? (
                      <CircularProgress color="secondary" size={30} />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        <Grid container direction="column" justifyContent="center">
          <Grid item sx={{ textAlign: "center" }}>
            <Typography variant="body1" gutterBottom>
              Already Registered?{` `}
              <Link href="/login" underline="none">
                LOGIN
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;
