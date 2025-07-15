import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Container, Typography, CircularProgress } from "@mui/material";

interface User {
  firstName: string;
  lastName: string;
}

const CaregiverDashboard: React.FC = () => {
  //onst { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/users/3`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    // if (userId) {
    //   fetchUser();
    // }
  }, []);

  if (loading) {
    return (
      <Container>
        <Box mt={4} textAlign="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Caregiver Dashboard
        </Typography>
        {user && (
          <Typography variant="h6" gutterBottom>
            Welcome back, {user.firstName} {user.lastName}!
          </Typography>
        )}

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button variant="outlined">View Open Jobs</Button>
            <Button variant="outlined">Your Jobs</Button>
            <Button variant="outlined">Your Profile</Button>
            <Button variant="outlined">Messages</Button>
          </Box>
        </Box>

        <Box mt={6}>
          <Typography variant="h6" gutterBottom>
            Open Job Listings
          </Typography>
          {/* TODO: Add Open Job List here */}
        </Box>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Your Assigned Jobs
          </Typography>
          {/* TODO: Add Assigned Jobs List here */}
        </Box>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Profile Overview
          </Typography>
          {/* TODO: Add Profile Summary or link to profile editing */}
        </Box>
      </Box>
    </Container>
  );
};

export default CaregiverDashboard;
