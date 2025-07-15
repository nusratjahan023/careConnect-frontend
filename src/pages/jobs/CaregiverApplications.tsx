// src/components/CaregiverApplications.tsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Stack,
  Paper,
  Avatar,
  Button,
  Rating,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";

interface Caregiver {
  id: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  avatarUrl?: string;
}

interface ReviewData {
  caregiverId: number;
  averageRating: number;
  reviewCount: number;
}

interface CaregiverApplicationsProps {
  caregivers: Caregiver[];
  onAccept: (caregiverId: number) => void;
  onViewProfile: (caregiverId: number) => void;
}

const CaregiverApplications: React.FC<CaregiverApplicationsProps> = ({
  caregivers,
  onAccept,
  onViewProfile,
}) => {
  const [reviews, setReviews] = useState<Record<number, ReviewData>>({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const ids = caregivers.map((cg) => cg.id);
        const res = await axios.post("/api/reviews/ratings", { ids }); // Adjust endpoint as needed
        const data: ReviewData[] = res.data;
        const mapped = data.reduce((acc, item) => {
          acc[item.caregiverId] = item;
          return acc;
        }, {} as Record<number, ReviewData>);
        setReviews(mapped);
      } catch (err) {
        console.error("Failed to fetch caregiver ratings:", err);
      }
    };

    if (caregivers.length > 0) fetchReviews();
  }, [caregivers]);

  if (caregivers.length === 0) return null;

  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        <PeopleIcon sx={{ mr: 1 }} />
        Applicants
      </Typography>
      <Stack spacing={2}>
        {caregivers.map((cg) => {
          const fullName = cg.name || `${cg.firstName ?? ""} ${cg.lastName ?? ""}`.trim();
          const ratingInfo = reviews[cg.id];

          return (
            <Paper key={cg.id} sx={{ p: 2, borderRadius: 2 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={cg.avatarUrl} alt={fullName} />
                <Box flexGrow={1}>
                  <Typography variant="subtitle1">{fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {cg.email}
                  </Typography>
                  {ratingInfo && (
                    <Box display="flex" alignItems="center" mt={1}>
                      <Rating
                        value={ratingInfo.averageRating}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({ratingInfo.reviewCount} reviews)
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onAccept(cg.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onViewProfile(cg.id)}
                  >
                    View Profile
                  </Button>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </>
  );
};

export default CaregiverApplications;
