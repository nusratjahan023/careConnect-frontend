import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Box, Typography, Grid, Paper, IconButton
} from '@mui/material';
import axios from 'axios';
import { Add, Delete } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const UserDetailsForm = () => {
  const { id } = useParams<{ id: string }>();
  const [userDetails, setUserDetails] = useState({
    bio: '',
    certifications: [''],
    skills: [''],
    educations: [''],
    jobExperiences: [''],
    languages: [''],
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/users/profile/${id}`)
      .then(res => setUserDetails(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (field: string, value: any) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleListChange = (field: string, index: number, value: string) => {
    const updatedList = [...userDetails[field]];
    updatedList[index] = value;
    handleChange(field, updatedList);
  };

  const addListItem = (field: string) => {
    handleChange(field, [...userDetails[field], '']);
  };

  const removeListItem = (field: string, index: number) => {
    const updatedList = [...userDetails[field]];
    updatedList.splice(index, 1);
    handleChange(field, updatedList);
  };

  const handleSubmit = () => {
    // axios.post(`/api/users/${userId}/details`, userDetails)
    //   .then(res => alert('Saved successfully!'))
    //   .catch(err => console.error(err));
  };

  const renderListInput = (label: string, field: string) => (
    <Box mb={2}>
      <Typography variant="h6">{label}</Typography>
      {userDetails[field]?.map((item: string, index: number) => (
        <Box key={index} display="flex" alignItems="center" mb={1}>
          <TextField
            fullWidth
            value={item}
            onChange={e => handleListChange(field, index, e.target.value)}
          />
          <IconButton onClick={() => removeListItem(field, index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Button variant="outlined" startIcon={<Add />} onClick={() => addListItem(field)}>
        Add {label.slice(0, -1)}
      </Button>
    </Box>
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Edit User Details</Typography>

      <TextField
        label="Bio"
        multiline
        fullWidth
        rows={3}
        value={userDetails.bio}
        onChange={(e) => handleChange('bio', e.target.value)}
        margin="normal"
      />

      {renderListInput('Certifications', 'certifications')}
      {renderListInput('Skills', 'skills')}
      {renderListInput('Educations', 'educations')}
      {renderListInput('Job Experiences', 'jobExperiences')}
      {renderListInput('Languages', 'languages')}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Paper>
  );
};

export default UserDetailsForm;
