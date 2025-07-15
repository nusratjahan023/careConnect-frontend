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
} from "@mui/material";

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

const BrowseJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:8082/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        setError("Failed to load jobs.");
        console.error(err);
      });
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      job.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <Box px={4} py={5}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Browse Jobs
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search by Title"
            variant="outlined"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search by Location"
            variant="outlined"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
        </Grid>
      </Grid>

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
                  <Typography variant="h6" fontWeight={600}>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                  <Typography mt={1}>
                    <strong>Hourly Rate:</strong> ${job.hourlyRate}
                  </Typography>
                  <Typography mt={1}>
                    <strong>Start:</strong>{" "}
                    {new Date(job.startTime).toLocaleString()}
                  </Typography>
                  <Typography>
                    <strong>End:</strong>{" "}
                    {new Date(job.endTime).toLocaleString()}
                  </Typography>
                  <Typography mt={1} mb={1}>
                    {job.summary}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Description:</strong>{" "}
                    {job.description?.substring(0, 80)}...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Requirements:</strong>{" "}
                    {job.requirements?.substring(0, 80)}...
                  </Typography>

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
    </Box>
  );
};

export default BrowseJobs;
