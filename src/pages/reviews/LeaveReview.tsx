import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Rating, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LeaveReview = () => {
  const { id } = useParams();
  const [rating, setRating] = useState<number | null>(4);
  const [review, setReview] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleSubmit = async () => {
    const payload = {
      rating,
      description: review,
      reviewForId: id,
      reviewedById: userId,
    };

    try {
      const response = await axios.post('http://localhost:8081/users/reviews', payload);
      console.log('Review submitted:', response.data);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        window.history.back(); // redirect to previous page
      }, 1500);
    } catch (err) {
      console.error('Error submitting review:', err);
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Leave a Review</Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>Review submitted successfully! Redirecting...</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>Something went wrong. Please try again.</Alert>}

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
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default LeaveReview;
