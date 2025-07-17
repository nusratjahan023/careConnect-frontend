import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Stack,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PaymentIcon from "@mui/icons-material/Payment";
import CaregiverApplications from "./CaregiverApplications";

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caregivers, setCaregivers] = useState<any[]>([]);

  const handleApply = async (jobId: number, userId: number) => {
    try {
      await axios.post(`http://localhost:8082/jobs/apply?jobPostId=${jobId}&caregiverId=${userId}`);
      await fetchJob();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to apply.");
    }
  };

  const handleComplete = async (jobId: number, userId: number) => {
    try {
      await axios.post(`http://localhost:8082/jobs/complete?jobPostId=${jobId}&caregiverId=${userId}`);
      await fetchJob();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to mark as complete.");
    }
  };

  const fetchJob = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/jobs/${id}`);
      const jobData = response.data;
      setJob(jobData);

      if (jobData.applications?.length > 0) {
        const caregiverIds = jobData.applications.map((app: any) => app.caregiverId);
        const caregiverResponses = await Promise.all(
          caregiverIds.map((id: number) => axios.get(`http://localhost:8081/users/${id}`))
        );
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
      const payload = { jobId: job.id, careGiverId };
      const response = await fetch("http://localhost:8082/jobs/accept-caregiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to accept caregiver");
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
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          {job.title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <AssignmentTurnedInIcon color="primary" />
          <Typography variant="h6">Status: {job.status}</Typography>
        </Stack>

        {job.canViewPaymentStatus && (
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <PaymentIcon color="success" />
            <Typography variant="h6">Payment: {job.paymentStatus}</Typography>
          </Stack>
        )}

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <PersonIcon color="secondary" />
          <Typography variant="body1">
            <strong>Assigned Caregiver ID:</strong> {job.assignedUserId ?? "Not assigned"}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <LocationOnIcon color="error" />
          <Typography variant="body1">
            <strong>Location:</strong> {job.location}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="flex-start" mb={2}>
          <DescriptionIcon color="info" />
          <Typography variant="body1">{job.description}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <ChecklistIcon color="warning" />
          <Typography variant="body1">
            <strong>Requirements:</strong> {job.requirements}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <AccessTimeIcon color="info" />
          <Typography variant="body1">
            <strong>Start Time:</strong> {new Date(job.startTime).toLocaleString()}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <AccessTimeIcon color="info" />
          <Typography variant="body1">
            <strong>End Time:</strong> {new Date(job.endTime).toLocaleString()}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <AttachMoneyIcon color="success" />
          <Typography variant="body1">
            <strong>Hourly Rate:</strong> ${job.hourlyRate}
          </Typography>
        </Stack>

        {/* Action Buttons */}
        {job.canApply && (
          <Button variant="contained" color="primary" size="large" fullWidth sx={{ mt: 2 }} onClick={() => handleApply(job.id, 2)}>
            Apply for this Job
          </Button>
        )}

        {job.canEdit && (
          <Button variant="outlined" color="secondary" size="large" fullWidth sx={{ mt: 2 }} onClick={() => window.location.href = `/edit-job/${job.id}`}>
            Edit Job Details
          </Button>
        )}

        {job.canMakePayment && (
          <Button variant="outlined" color="success" size="large" fullWidth sx={{ mt: 2 }} onClick={() => window.location.href = `/payment?jobId=${job.id}`}>
            Make a Payment
          </Button>
        )}

        {job.canAddReview && (
          <Button variant="outlined" color="warning" size="large" fullWidth sx={{ mt: 2 }} onClick={() => window.location.href = `/review/${job.id}`}>
            Add a Review
          </Button>
        )}

        {job.canComplete && (
          <Button variant="outlined" color="info" size="large" fullWidth sx={{ mt: 2 }} onClick={() => handleComplete(job.id, 2)}>
            Mark as Complete
          </Button>
        )}

        {/* Caregiver Applications */}
        {job.canViewApplicantList && (
          <Box mt={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Applicants
            </Typography>
            <CaregiverApplications
              caregivers={caregivers}
              onAccept={onAccept}
              onViewProfile={(id) => (window.location.href = `/profile/${id}`)}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default JobDetails;
