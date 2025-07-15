import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import CertificationList from "./CertificationList";
import Languages from "./Languages";
import JobExperienceList from "./JobExperience";
import { Rating } from "@mui/material";
import EducationList from "./Education";

const ViewProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/users/profile/${id}`
        );
        setProfile(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to load caregiver profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!profile) return null;

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    role,
    rating,
    userDetails,
  } = profile;

  return (
    <Box p={3}>
      <Avatar
        alt={firstName}
        src={profile.avatarUrl || "/default-avatar.jpg"}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h5">
        {firstName} {lastName || ""}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {role || "Caregiver"} | {address || "St. John's, NL"}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={1}>
        Email: {email}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Phone: {phone}
      </Typography>
      <Box display="flex" alignItems="center" mt={1}>
  <Typography variant="body2" color="text.secondary" mr={1}>
    Rating:
  </Typography>
  <Rating value={5} precision={0.5} readOnly />
</Box>


      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Bio</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {userDetails?.bio || "No biography available."}
      </Typography>

      {userDetails?.skills?.length > 0 && (
        <>
          <Typography variant="h6">Skills</Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
            {userDetails.skills.map((skill: any, index: number) => (
              <Chip key={index} label={skill.name || skill} />
            ))}
          </Stack>
        </>
      )}

      <Typography variant="h6" gutterBottom>
        Certifications
      </Typography>

      <CertificationList certifications={userDetails?.certifications} />

      <Typography variant="h6" gutterBottom>
        Languages
      </Typography>
      <Languages languages={[]}/>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      <EducationList educationList={[]}/>
      <Typography variant="h6" gutterBottom>
        Job Experiences
      </Typography>
      <JobExperienceList jobExperiences={[]}/>
    </Box>
  );
};

export default ViewProfile;
