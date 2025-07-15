import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const Messages = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Messages</Typography>
      <List>
        <ListItem button>
          <ListItemText primary="John Doe" secondary="Hi, I need a caregiver next week..." />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Jane Smith" secondary="Can you help with evening care?" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Messages;
