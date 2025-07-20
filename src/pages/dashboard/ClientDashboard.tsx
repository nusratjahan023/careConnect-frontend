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
import { useNavigate, useParams } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
}

const ClientDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/users/${id}`);
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
          Client Dashboard
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
                onClick={() => navigate("/caregivers")}
              >
                Browse Caregivers
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/post-job")}
              >
                Post a job
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/jobs")}
              >
                View Jobs
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/profile/${id}`)}
              >
                View Profile
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/jobs/user/${id}`)}
              >
                My Jobs
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ClientDashboard;