import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const Contacts: React.FC = () => {
  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          For any questions or support, reach out to us:
        </Typography>
        <Typography variant="body2">
          📧 Email: <Link href="mailto:support@careconnectnl.ca">support@careconnectnl.ca</Link>
        </Typography>
        <Typography variant="body2">
          📞 Phone: (709) 123-4567
        </Typography>
        <Typography variant="body2">
          📍 Address: St. John's, NL, Canada
        </Typography>
      </Box>
    </Container>
  );
};

export default Contacts;
