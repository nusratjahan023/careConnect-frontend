import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          Our platform connects caregivers and clients across Newfoundland. Whether you're seeking care or offering it, we aim to make the process seamless, professional, and safe.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
