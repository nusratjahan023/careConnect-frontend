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
  Tabs,
  Tab,
  Paper,
  Tooltip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import StarRateIcon from "@mui/icons-material/StarRate";

import CertificationList from "./CertificationList";
import Languages from "./Languages";
import JobExperienceList from "./JobExperience";
import { Rating } from "@mui/material";
import EducationList from "./EducationList";
import UserReviews from "../reviews/Reviews";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const ViewProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/users/profile/${id}`
        );
        setProfile(response.data);
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
    <Paper elevation={3} sx={{ p: 4, width: "80%", mx: "auto", mt: 4 }}>
      <Box display="flex" justifyContent="center" mb={3}>
        <Avatar
          alt={firstName}
          src={profile.avatarUrl || "/default-avatar.jpg"}
          sx={{ width: 120, height: 120, boxShadow: 3 }}
        />
      </Box>

      <Box textAlign="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          {firstName} {lastName}
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={1} alignItems="center">
          <WorkIcon color="primary" />
          <Typography variant="subtitle1" color="text.secondary">
            {role || "Caregiver"}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={1} alignItems="center" mt={1}>
          <HomeIcon color="action" />
          <Typography variant="body2">{address || "St. John's, NL"}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={1} alignItems="center" mt={1}>
          <EmailIcon color="secondary" />
          <Typography variant="body2">{email}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={1} alignItems="center" mt={1}>
          <PhoneIcon sx={{ color: "#4caf50" }} />
          <Typography variant="body2">{phone}</Typography>
        </Stack>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Tooltip title="Overall Rating">
          <StarRateIcon color="warning" />
        </Tooltip>
        <Rating value={rating} precision={0.5} readOnly />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Bio
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {userDetails?.bio || "No biography available."}
        </Typography>
      </Box>

      {userDetails?.skills?.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {userDetails.skills.map((skill: any, index: number) => (
              <Chip
                key={index}
                label={skill.name || skill}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      )}

      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
      >
        <Tab label="Certifications" />
        <Tab label="Languages" />
        <Tab label="Education" />
        <Tab label="Experience" />
        <Tab label="Reviews" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <CertificationList
          certifications={userDetails?.certifications}
          userId={id}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Languages languages={userDetails?.languages || []} />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <EducationList
          educationList={userDetails?.educations}
          userId={id}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <JobExperienceList jobExperiences={userDetails?.jobExperiences || []} />
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        <UserReviews userId={id} />
      </TabPanel>
    </Paper>
  );
};

export default ViewProfile;
