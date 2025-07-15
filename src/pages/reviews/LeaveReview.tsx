import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Rating } from '@mui/material';

const LeaveReview = () => {
  const [rating, setRating] = useState<number | null>(4);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    console.log({ rating, review });
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Leave a Review</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
      />
      <TextField
        label="Your Review"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default LeaveReview;
