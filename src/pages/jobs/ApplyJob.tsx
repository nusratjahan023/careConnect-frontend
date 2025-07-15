import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import DescriptionIcon from "@mui/icons-material/Description";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ApplyJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  return (
    <Box p={3} maxWidth={700} mx="auto">
      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {/* Job Details */}
          <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Typography variant="h4" gutterBottom display="flex" alignItems="center">
              <WorkIcon sx={{ mr: 1, color: "primary.main" }} />
              {job?.title}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" display="flex" alignItems="center" sx={{ mb: 2 }}>
              <PlaceIcon sx={{ mr: 1 }} />
              {job?.location}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="body1" display="flex" alignItems="center" sx={{ mb: 1 }}>
              <DescriptionIcon sx={{ mr: 1, color: "text.secondary" }} />
              <strong>Description:</strong>&nbsp; {job?.description}
            </Typography>

            <Typography variant="body1" display="flex" alignItems="center" sx={{ mb: 1 }}>
              <ChecklistIcon sx={{ mr: 1, color: "text.secondary" }} />
              <strong>Requirements:</strong>&nbsp; {job?.requirements}
            </Typography>

            <Typography variant="body1" display="flex" alignItems="center" sx={{ mb: 1 }}>
              <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
              <strong>Start:</strong>&nbsp; {new Date(job?.startTime).toLocaleString()}
            </Typography>

            <Typography variant="body1" display="flex" alignItems="center" sx={{ mb: 1 }}>
              <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
              <strong>End:</strong>&nbsp; {new Date(job?.endTime).toLocaleString()}
            </Typography>

            <Typography variant="body1" display="flex" alignItems="center">
              <AttachMoneyIcon sx={{ mr: 1, color: "text.secondary" }} />
              <strong>Hourly Rate:</strong>&nbsp; ${job?.hourlyRate}
            </Typography>
          </Paper>

          {/* Application Form */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom display="flex" alignItems="center">
              <EditNoteIcon sx={{ mr: 1, color: "primary.main" }} />
              Apply for this Job
            </Typography>
            <TextField
              fullWidth
              label="Your Name"
              margin="normal"
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />,
              }}
            />
            <TextField
              fullWidth
              label="Your Experience"
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Why are you a good fit?"
              margin="normal"
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.2 }}>
              Submit Application
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default ApplyJob;
