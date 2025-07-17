import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8081/users";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, role: event.target.value }));
  };

  const handleSubmit = async () => {
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      const userRole = response.data.role;
      const userId = response.data.id

      if (userRole === "CAREGIVER") {
        navigate(`/caregiver-dashboard?userId=${userId}`);
      } else if (userRole === "CLIENT") {
        navigate(`/client-dashboard/${userId}`);
      } else if (userRole === "ADMIN") {
        navigate(`/admin-dashboard/${userId}`);
      } else {
        setError("Unknown role received from server");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          margin="normal"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          margin="normal"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            name="role"
            value={formData.role}
            label="Role"
            onChange={handleRoleChange}
          >
            <MenuItem value={"ADMIN"}>Admin</MenuItem>
            <MenuItem value={"CAREGIVER"}>Caregiver</MenuItem>
            <MenuItem value={"CLIENT"}>Client</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          type="tel"
          margin="normal"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="address"
          name="address"
          margin="normal"
          required
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          margin="normal"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
      </Box>
    </Container>
  );
};

export default SignupPage;
