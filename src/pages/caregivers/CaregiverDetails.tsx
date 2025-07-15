import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";

const CaregiverDetails: React.FC = () => {
  const caregiver = {
    name: "Jane Doe",
    bio: "Experienced elder care professional with 5+ years.",
    skills: "CPR, First Aid, Dementia Care",
    location: "St. John's",
    rate: "$25/hour",
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          {caregiver.name}
        </Typography>
        <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
          <Typography variant="subtitle1">{caregiver.bio}</Typography>
          <Typography>Skills: {caregiver.skills}</Typography>
          <Typography>Location: {caregiver.location}</Typography>
          <Typography>Rate: {caregiver.rate}</Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            Hire Now
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default CaregiverDetails;
