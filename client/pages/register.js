import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Register = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Register
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;