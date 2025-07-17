import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LeaveReview = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [rating, setRating] = useState<number | null>(4);
  const [review, setReview] = useState('');
  const [jobData, setJobData] = useState<any>(null); // holds the fetched job

  // Fetch the job on component mount
  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      try {
        const response = await axios.get(`http://localhost:8082/jobs/${jobId}`);
        setJobData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleSubmit = async () => {
    if (!jobId || !jobData) {
      console.error("Missing job data or job ID");
      return;
    }

    const payload = {
      rating,
      description: review,
      reviewForId: jobData.assignedUserId,
      reviewedById: 3,
    };

    try {
      const response = await axios.post('http://localhost:8081/users/reviews', payload);
      console.log('Review submitted:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
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
      <Button variant="contained" onClick={handleSubmit} disabled={!jobData}>
        Submit
      </Button>
    </Box>
  );
};

export default LeaveReview;
