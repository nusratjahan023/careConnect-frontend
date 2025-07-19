import React, { useEffect, useState } from "react";
import { Stack, Typography, Link, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaregiverInfo = ({ caregiverId }) => {
  const [caregiver, setCaregiver] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (caregiverId) {
      setLoading(true);
      axios
        .get(`http://localhost:8081/users/${caregiverId}`)
        .then((res) => setCaregiver(res.data))
        .catch((err) => console.error("Error fetching caregiver", err))
        .finally(() => setLoading(false));
    }
  }, [caregiverId]);

  return (
    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
      <PersonIcon color="secondary" />
      <Typography variant="body1">
        <strong>Assigned Caregiver:</strong>{" "}
        {loading ? (
          <CircularProgress size={16} />
        ) : caregiver ? (
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate(`/profile/${caregiver.id}`)}
            underline="hover"
          >
            {caregiver.firstName} {caregiver.lastName}
          </Link>
        ) : (
          "Not assigned"
        )}
      </Typography>
    </Stack>
  );
};

export default CaregiverInfo;
