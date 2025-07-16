import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DescriptionIcon from "@mui/icons-material/Description";
import CaregiverApplications from "./CaregiverApplications";

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caregivers, setCaregivers] = useState<any[]>([]);

  const handleApply = async (jobId: number, userId: number) => {
    try {
      await axios.post(
        `http://localhost:8082/jobs/apply?jobPostId=${jobId}&caregiverId=${userId}`
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed.");
    }
  };

  const handleComplete = async (jobId: number, userId: number) => {
    try {
      await axios.post(
        `http://localhost:8082/jobs/complete?jobPostId=${jobId}&caregiverId=${userId}`
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed.");
    }
  };

  const fetchJob = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/jobs/${id}`);
      const jobData = response.data;
      setJob(jobData);

      if (jobData.applications?.length > 0) {
        const caregiverIds = jobData.applications.map(
          (app: any) => app.caregiverId
        );

        const caregiverPromises = caregiverIds.map((id: number) =>
          axios.get(`http://localhost:8081/users/${id}`)
        );

        const caregiverResponses = await Promise.all(caregiverPromises);
        const caregiverData = caregiverResponses.map((res) => res.data);
        setCaregivers(caregiverData);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load job details.");
    } finally {
      setLoading(false);
    }
  };

  const onAccept = async (careGiverId: number) => {
    try {
      const payload = {
        jobId: job.id,
        careGiverId: careGiverId,
      };

      const response = await fetch(
        "http://localhost:8082/jobs/accept-caregiver",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept caregiver");
      }

      console.log("Caregiver accepted successfully:", payload);
      await fetchJob();
    } catch (error) {
      console.error("Error accepting caregiver:", error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box p={3} maxWidth={700} mx="auto">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          {job.title}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Job Status: {job.status}
        </Typography>

        {job.canViewPaymentStatus &&
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Payment Status: {job.paymentStatus}
        </Typography>
        }

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Assigned to: {job.assignedUserId}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LocationOnIcon color="action" />
          <Typography variant="subtitle1" color="text.secondary">
            {job.location}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="flex-start" mb={2}>
          <DescriptionIcon color="action" sx={{ mt: "2px" }} />
          <Typography variant="body1">{job.description}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <ChecklistIcon color="action" />
          <Typography variant="body2">
            <strong>Requirements:</strong> {job.requirements}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <AccessTimeIcon color="action" />
          <Typography variant="body2">
            <strong>Start:</strong> {new Date(job.startTime).toLocaleString()}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <AccessTimeIcon color="action" />
          <Typography variant="body2">
            <strong>End:</strong> {new Date(job.endTime).toLocaleString()}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <AttachMoneyIcon color="action" />
          <Typography variant="body2">
            <strong>Hourly Rate:</strong> ${job.hourlyRate}
          </Typography>
        </Stack>

        {job.canApply && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => handleApply(job.id, 2)} // Replace 1 with logged-in user ID
          >
            Apply Now
          </Button>
        )}
        {job.canEdit && (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              window.location.href = `/edit-job/${job.id}`;
            }}
          >
            Edit Job
          </Button>
        )}

        {job.canMakePayment && (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              window.location.href = `/payment?jobId=${job.id}`;
            }}
          >
            Make Payment
          </Button>
        )}

        {job.canAddReview && (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              window.location.href = `/review?jobId=${job.id}`;
            }}
          >
            Add Review
          </Button>
        )}

        {job.canComplete && (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => handleComplete(job.id, 2)}
          >
            Mark as Complete
          </Button>
        )}

        {/* Caregiver List */}
        {job.canViewApplicantList && (
          <CaregiverApplications
            caregivers={caregivers}
            onAccept={onAccept}
            onViewProfile={(id) => {
              window.location.href = `/profile/${id}`;
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default JobDetails;
