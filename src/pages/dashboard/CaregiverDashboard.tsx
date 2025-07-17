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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8081/users/3");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
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

        {user && (
          <Typography variant="h6" gutterBottom>
            Welcome back, {user.firstName} {user.lastName}!
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
                onClick={() => navigate("/profile/3")}
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