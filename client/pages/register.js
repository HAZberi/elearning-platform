import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ my: 7, pb: 10 }}>
        <Grid container direction="column" spacing={2} justifyContent="center">
          <Grid item sx={{ mt: 3, mb: 1, textAlign: "center" }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Register
            </Typography>
          </Grid>
          <Grid item sx={{ mx: 4 }}>
            <TextField id="name" label="Name" variant="outlined" fullWidth />
          </Grid>
          <Grid item sx={{ mx: 4 }}>
            <TextField id="email" label="Email" variant="outlined" fullWidth />
          </Grid>
          <Grid item sx={{ mx: 4 }}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sx={{ mx: 4, my: 4 }}>
            <Button variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;
