import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  useTheme,
  Stack,
  Slider,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SearchIcon from "@mui/icons-material/Search";

interface Job {
  id: number;
  title: string;
  location: string;
  summary: string;
  description: string;
  requirements: string;
  startTime: string;
  endTime: string;
  hourlyRate: string;
}

const ClientJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [minRate, setMinRate] = useState<number>(0);
  const [maxRate, setMaxRate] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:8082/jobs/client/${userId}`)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        setError("Failed to load jobs.");
        console.error(err);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const rate = parseFloat(job.hourlyRate);
    return (
      job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      job.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
      rate >= minRate &&
      rate <= maxRate
    );
  });

  return (
    <Box px={4} py={5}>
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        My Jobs
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Box p={2} bgcolor="#f9f9f9" borderRadius={2} boxShadow={1}>
            <Typography variant="h6" gutterBottom>
              <SearchIcon fontSize="small" /> Filter Jobs
            </Typography>

            <TextField
              fullWidth
              label="Job Title"
              variant="outlined"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            />

            <Typography gutterBottom>Hourly Rate ($)</Typography>
            <Slider
              value={[minRate, maxRate]}
              onChange={(_, newValue) => {
                const [min, max] = newValue as number[];
                setMinRate(min);
                setMaxRate(max);
              }}
              valueLabelDisplay="auto"
              min={0}
              max={200}
              sx={{ mb: 3 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          {error && (
            <Typography color="error" sx={{ mb: 3 }}>
             {error}
            </Typography>
          )}

          <Grid container spacing={3}>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Grid item xs={12} md={6} key={job.id}>
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: theme.shadows[6],
                      },
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <WorkIcon color="primary" />
                        <Typography variant="h6" fontWeight={600}>
                          {job.title}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} mt={1} alignItems="center">
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} mt={1} alignItems="center">
                        <MonetizationOnIcon fontSize="small" sx={{ color: "#388e3c" }} />
                        <Typography variant="body2" sx={{ color: "#388e3c" }}>
                          <strong>${job.hourlyRate}/hr</strong>
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} mt={1} alignItems="center">
                        <AccessTimeIcon fontSize="small" color="disabled" />
                        <Typography variant="body2">
                          <strong>Start:</strong>{" "}
                          {new Date(job.startTime).toLocaleString()}
                        </Typography>
                      </Stack>

                      <Typography variant="body2" ml={4}>
                        <strong>End:</strong>{" "}
                        {new Date(job.endTime).toLocaleString()}
                      </Typography>

                      <Typography mt={2} mb={1} color="text.primary">
                        {job.summary}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <DescriptionIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Description:</strong>{" "}
                          {job.description?.substring(0, 80)}...
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                        <ChecklistIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Requirements:</strong>{" "}
                          {job.requirements?.substring(0, 80)}...
                        </Typography>
                      </Stack>

                      <Box mt={2}>
                        <Button
                          variant="contained"
                          size="small"
                          href={`/jobs/${job.id}`}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            backgroundColor: theme.palette.primary.main,
                            "&:hover": {
                              backgroundColor: theme.palette.primary.dark,
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary">
                  No jobs found matching your criteria.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientJobs;
