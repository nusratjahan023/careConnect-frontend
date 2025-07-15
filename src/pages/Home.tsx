import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box py={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Welcome to CareConnect NL
        </Typography>
        <Typography variant="body1" paragraph>
          A trusted platform for caregivers and clients in Newfoundland and Labrador.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" onClick={() => navigate('/browse-caregivers')} sx={{ mr: 2 }}>
            Find Caregivers
          </Button>
          <Button variant="outlined" onClick={() => navigate('/signup')}>
            Join as Caregiver
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
