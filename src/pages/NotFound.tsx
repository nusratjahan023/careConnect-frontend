import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box py={10} textAlign="center">
        <Typography variant="h2" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
