import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Button,
} from '@mui/material';
import { Edit, Save, Add } from '@mui/icons-material';

export interface JobExperience {
  id: number;
  user_details_id?: number;
  institution: string;
  degree: string;
  designation: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
}

interface Props {
  jobExperiences: JobExperience[];
}

const JobExperienceList: React.FC<Props> = ({ jobExperiences: initialJobs }) => {
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>(initialJobs);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newJob, setNewJob] = useState<Partial<JobExperience>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (id: number) => {
    setEditingId(id);
    const job = jobExperiences.find((j) => j.id === id);
    if (job) setNewJob({ ...job });
  };

  const handleSave = async () => {
    const requiredFields = ['institution', 'degree', 'designation', 'startDate', 'endDate'];
    if (!requiredFields.every((field) => newJob[field as keyof JobExperience])) return;

    const method = editingId !== null ? 'PUT' : 'POST';
    const url = editingId !== null ? `/api/job-experiences/${editingId}` : '/api/job-experiences';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });

      if (response.ok) {
        const savedJob = await response.json();
        if (editingId !== null) {
          setJobExperiences((prev) =>
            prev.map((j) => (j.id === editingId ? savedJob : j))
          );
        } else {
          setJobExperiences((prev) => [...prev, savedJob]);
        }
        setEditingId(null);
        setIsAdding(false);
        setNewJob({});
      } else {
        console.error('Failed to save job experience');
      }
    } catch (error) {
      console.error('Error saving job experience', error);
    }
  };

  const renderFormFields = () => (
    <>
      <TextField
        label="Institution"
        value={newJob.institution || ''}
        onChange={(e) => setNewJob({ ...newJob, institution: e.target.value })}
        size="small"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Degree"
        value={newJob.degree || ''}
        onChange={(e) => setNewJob({ ...newJob, degree: e.target.value })}
        size="small"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Designation"
        value={newJob.designation || ''}
        onChange={(e) => setNewJob({ ...newJob, designation: e.target.value })}
        size="small"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Start Date"
        type="date"
        value={newJob.startDate || ''}
        onChange={(e) => setNewJob({ ...newJob, startDate: e.target.value })}
        size="small"
        InputLabelProps={{ shrink: true }}
        sx={{ mr: 1 }}
      />
      <TextField
        label="End Date"
        type="date"
        value={newJob.endDate || ''}
        onChange={(e) => setNewJob({ ...newJob, endDate: e.target.value })}
        size="small"
        InputLabelProps={{ shrink: true }}
        sx={{ mr: 1 }}
      />
      <TextField
        label="Description"
        value={newJob.description || ''}
        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
        size="small"
        fullWidth
        multiline
        sx={{ mt: 1 }}
      />
    </>
  );

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Job Experiences
        </Typography>
        <List>
          {jobExperiences.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No job experiences listed.
            </Typography>
          )}
          {jobExperiences.map((job) =>
            editingId === job.id ? (
              <ListItem key={job.id} divider sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                {renderFormFields()}
                <IconButton onClick={handleSave} sx={{ alignSelf: 'flex-end', mt: 1 }}>
                  <Save />
                </IconButton>
              </ListItem>
            ) : (
              <ListItem key={job.id} divider sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText
                  primary={`${job.designation} at ${job.institution}`}
                  secondary={`Degree: ${job.degree} | ${job.startDate} to ${job.endDate}\n${job.description}`}
                />
                <IconButton onClick={() => handleEdit(job.id)} sx={{ alignSelf: 'flex-end' }}>
                  <Edit />
                </IconButton>
              </ListItem>
            )
          )}
          {isAdding && (
            <ListItem divider sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              {renderFormFields()}
              <IconButton onClick={handleSave} sx={{ alignSelf: 'flex-end', mt: 1 }}>
                <Save />
              </IconButton>
            </ListItem>
          )}
        </List>

        {!isAdding && (
          <Button
            startIcon={<Add />}
            onClick={() => {
              setIsAdding(true);
              setNewJob({});
              setEditingId(null);
            }}
          >
            Add Job Experience
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default JobExperienceList;
