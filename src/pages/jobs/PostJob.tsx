import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  InputAdornment,
  useTheme,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SendIcon from "@mui/icons-material/Send";

const PostJob: React.FC = () => {
  const { jobId } = useParams<{ jobId?: string }>();
  const navigate = useNavigate();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    requirements: "",
    startTime: "",
    endTime: "",
    hourlyRate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (jobId) {
      axios
        .get(`http://localhost:8082/jobs/${jobId}`)
        .then((response) => {
          const job = response.data;
          setFormData({
            title: job.title || "",
            location: job.location || "",
            description: job.description || "",
            requirements: job.requirements || "",
            startTime: job.startTime || "",
            endTime: job.endTime || "",
            hourlyRate: job.hourlyRate?.toString() || "",
          });
        })
        .catch((error) => {
          setApiError("Failed to load job details.");
          console.error(error);
        });
    }
  }, [jobId]);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
    setErrors({ ...errors, [field]: "" });
    setApiError("");
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "This field is required.";
    });
    if (formData.startTime && formData.endTime && new Date(formData.startTime) >= new Date(formData.endTime)) {
      newErrors.endTime = "End time must be after start time.";
    }
    if (formData.hourlyRate && isNaN(Number(formData.hourlyRate))) {
      newErrors.hourlyRate = "Hourly pay must be a number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      setSubmitted(false);
      return;
    }

    try {
      if (jobId) {
        const response = await axios.put(`http://localhost:8082/jobs/${jobId}`, formData);
        console.log("Job updated:", response.data);
      } else {
        const response = await axios.post("http://localhost:8082/jobs", formData);
        console.log("Job posted:", response.data);
      }

      setSubmitted(true);
      setApiError("");
      navigate("/jobs");
    } catch (error: any) {
      console.error("Error submitting job:", error);
      setSubmitted(false);
      setApiError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Box p={3} maxWidth={800} mx="auto">
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          {jobId ? "Edit Job" : "Post a Job"}
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {jobId ? "Job updated successfully!" : "Job posted successfully!"}
          </Alert>
        )}

        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Job Title"
            value={formData.title}
            onChange={handleChange("title")}
            error={!!errors.title}
            helperText={errors.title}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={handleChange("location")}
            error={!!errors.location}
            helperText={errors.location}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Job Description"
            multiline
            rows={5}
            value={formData.description}
            onChange={handleChange("description")}
            error={!!errors.description}
            helperText={errors.description}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon sx={{ color: theme.palette.info.main }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Requirements"
            multiline
            rows={3}
            value={formData.requirements}
            onChange={handleChange("requirements")}
            error={!!errors.requirements}
            helperText={errors.requirements}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIcon color="warning" />
                </InputAdornment>
              ),
            }}
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="From"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={formData.startTime}
                onChange={handleChange("startTime")}
                error={!!errors.startTime}
                helperText={errors.startTime}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon sx={{ color: theme.palette.grey[600] }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="To"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={formData.endTime}
                onChange={handleChange("endTime")}
                error={!!errors.endTime}
                helperText={errors.endTime}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon sx={{ color: theme.palette.grey[600] }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Hourly Pay Rate ($)"
            type="number"
            value={formData.hourlyRate}
            onChange={handleChange("hourlyRate")}
            error={!!errors.hourlyRate}
            helperText={errors.hourlyRate}
            margin="normal"
            inputProps={{ min: 0, step: "0.01" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon color="success" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 3, py: 1.5, fontWeight: "bold", fontSize: "1rem" }}
            endIcon={<SendIcon />}
          >
            {jobId ? "Update Job" : "Post Job"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PostJob;
