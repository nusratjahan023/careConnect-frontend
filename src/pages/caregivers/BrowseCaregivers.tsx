import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stack,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";

interface Caregiver {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  rating: number;
}

const BrowseCaregivers: React.FC = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/users/role/CAREGIVER")
      .then((response) => setCaregivers(response.data))
      .catch((error) => console.error("Failed to fetch caregivers:", error));
  }, []);

  const filteredCaregivers = caregivers.filter((cg) => {
    const term = searchTerm.toLowerCase();
    return (
      cg.firstName.toLowerCase().includes(term) ||
      cg.lastName.toLowerCase().includes(term) ||
      cg.email.toLowerCase().includes(term) ||
      cg.phone.toLowerCase().includes(term)
    );
  });

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Browse Caregivers
        </Typography>

        <TextField
          label="Search by name, email, or phone"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Grid container spacing={3}>
          {filteredCaregivers.map((cg) => (
            <Grid item xs={12} md={6} key={cg.id}>
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <PersonIcon color="primary" />
                    <Typography variant="h6">
                      {cg.firstName} {cg.lastName}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <EmailIcon color="info" />
                    <Typography>{cg.email}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PhoneIcon color="success" />
                    <Typography>{cg.phone}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <HomeIcon color="warning" />
                    <Typography>{cg.address}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <StarIcon color="secondary" />
                    <Rating value={cg.rating} readOnly precision={0.5} />
                  </Stack>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/profile/${cg.id}`)}
                  >
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
