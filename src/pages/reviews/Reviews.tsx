import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Rating,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { useParams } from 'react-router-dom';

interface Review {
  id: number;
  rating: number;
  comment: string;
  submittedOn: string;
  reviewedByName: string; 
}

const UserReviews = ({userId}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/users/reviews/${userId}`);
        setReviews(response.data);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        User Reviews
      </Typography>

      {reviews.length === 0 ? (
        <Typography>No reviews found for this user.</Typography>
      ) : (
        <Stack spacing={2}>
          {reviews.map((review) => (
            <Paper key={review.id} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Reviewed by: {review.reviewedByName}
              </Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body1" sx={{ mt: 1 }}>
                {review.comment}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Submitted on: {new Date(review.submittedOn).toLocaleDateString()}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UserReviews;
