import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const ResetPassword: React.FC = () => {
    const apiUrl = process.env.REACT_APP_AUTH_URL;

  return (
    <Container maxWidth="sm">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm New Password"
          type="password"
          margin="normal"
        />
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
