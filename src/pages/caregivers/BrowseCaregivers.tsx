import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";

const BrowseCaregivers: React.FC = () => {
  const caregivers = [
    { name: "Jane Doe", skills: "Elder Care, CPR", location: "St. John's" },
    { name: "John Smith", skills: "Disability Support", location: "Mount Pearl" },
  ];

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Browse Caregivers
        </Typography>
        <Grid container spacing={2}>
          {caregivers.map((cg, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{cg.name}</Typography>
                  <Typography>{cg.skills}</Typography>
                  <Typography color="text.secondary">{cg.location}</Typography>
                  <Button variant="outlined" sx={{ mt: 1 }}>
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BrowseCaregivers;
