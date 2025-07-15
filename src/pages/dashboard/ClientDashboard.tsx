import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const ClientDashboard: React.FC = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Client Dashboard
        </Typography>
        <Typography>Hello, Sarah!</Typography>
        <Box mt={3}>
          <Button variant="outlined" sx={{ mr: 2 }}>
            My Hires
          </Button>
          <Button variant="outlined" sx={{ mr: 2 }}>
            Post a Job
          </Button>
          <Button variant="outlined">Messages</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ClientDashboard;
