// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/users/login`, {
        email,
        password,
      });

      const { id, role } = response.data;

      localStorage.setItem('userId', id);
      localStorage.setItem('role', role);

      alert('Login successful');
      if (role === "CAREGIVER") {
        navigate(`/caregiver-dashboard/${id}`);
      } else if (role === "CLIENT") {
        navigate(`/client-dashboard/${id}`);
      } else if (role === "ADMIN") {
        navigate(`/admin-dashboard/${id}`);
      } else {
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>Login</Typography>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
