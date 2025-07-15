// src/pages/auth/LoginPage.jsx
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const LoginPage = () => {
    const apiUrl = process.env.REACT_APP_AUTH_URL;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>Login</Typography>
        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
