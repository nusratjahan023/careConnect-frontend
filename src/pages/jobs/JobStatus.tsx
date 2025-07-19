import React from "react";
import { Chip } from "@mui/material";

const statusColorMap: Record<string, "success" | "warning" | "default" | "error" | "info"> = {
  OPEN: "info",
  ASSIGNED: "warning",
  COMPLETED: "success",
  CLOSED: "error",
};

const statusLabelMap: Record<string, string> = {
  OPEN: "Open",
  ASSIGNED: "In Progress",
  COMPLETED: "Completed",
  CLOSED: "Cancelled",
};

interface JobStatusProps {
  jobStatus: string;
}

const JobStatus: React.FC<JobStatusProps> = ({ jobStatus }) => {
  const color = statusColorMap[jobStatus] || "default";
  const label = statusLabelMap[jobStatus] || "Unknown";

  return (
    <Chip label={label} color={color} variant="outlined" />
  );
};

export default JobStatus;
