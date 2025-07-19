import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
}

const CaregiverDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");

    if (storedUserId && storedRole) {
      setUserId(storedUserId);
      setRole(storedRole);

      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8081/users/${storedUserId}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      console.warn("User not logged in or missing localStorage data.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Container>
        <Box mt={6} textAlign="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Caregiver Dashboard
        </Typography>

        {user ? (
          <Typography variant="h6" gutterBottom>
            Welcome back, {user.firstName} {user.lastName}!
          </Typography>
        ) : (
          <Typography variant="h6" color="error">
            User data could not be loaded.
          </Typography>
        )}

        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/jobs")}
              >
                Browse Jobs
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/applied-jobs")}
              >
                My Applied Jobs
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/profile/${userId}`)}
              >
                Edit Profile
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/messages")}
              >
                Messages
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CaregiverDashboard;
