import React, { useEffect, useState } from "react";
import { Stack, Typography, Link, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientInfo = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (clientId) {
      setLoading(true);
      axios
        .get(`http://localhost:8081/users/${clientId}`)
        .then((res) => setClient(res.data))
        .catch((err) => console.error("Error fetching client", err))
        .finally(() => setLoading(false));
    }
  }, [clientId]);

  return (
    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
      <PersonIcon color="primary" />
      <Typography variant="body1">
        <strong>Client:</strong>{" "}
        {loading ? (
          <CircularProgress size={16} />
        ) : client ? (
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate(`/profile/${client.id}`)}
            underline="hover"
          >
            {client.firstName} {client.lastName}
          </Link>
        ) : (
          "Not available"
        )}
      </Typography>
    </Stack>
  );
};

export default ClientInfo;
