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

export interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  score?: number;
  description?: string;
}

interface Props {
  educationList: Education[];
}

const EducationList: React.FC<Props> = ({ educationList: initialEducation }) => {
  const [educationList, setEducationList] = useState<Education[]>(initialEducation);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newEducation, setNewEducation] = useState<Partial<Education>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (id: number) => {
    setEditingId(id);
    const edu = educationList.find((e) => e.id === id);
    if (edu) setNewEducation({ ...edu });
  };

  const handleSave = async () => {
    if (!newEducation.institution || !newEducation.degree || !newEducation.startDate || !newEducation.endDate) return;

    if (editingId !== null) {
      try {
        const response = await fetch(`/api/education/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEducation),
        });

        if (response.ok) {
          setEducationList((prev) =>
            prev.map((e) => (e.id === editingId ? { ...e, ...newEducation } as Education : e))
          );
          setEditingId(null);
          setNewEducation({});
        } else {
          console.error("Failed to update education");
        }
      } catch (error) {
        console.error("Error updating education", error);
      }
    } else {
      try {
        const response = await fetch(`/api/education`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEducation),
        });

        if (response.ok) {
          const savedEdu = await response.json();
          setEducationList((prev) => [...prev, savedEdu]);
          setIsAdding(false);
          setNewEducation({});
        } else {
          console.error("Failed to add education");
        }
      } catch (error) {
        console.error("Error adding education", error);
      }
    }
  };

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Education
        </Typography>
        <List>
          {educationList.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No education records listed.
            </Typography>
          )}
          {educationList.map((edu) =>
            editingId === edu.id ? (
              <ListItem key={edu.id} divider sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <TextField
                  label="Institution"
                  value={newEducation.institution || ''}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Degree"
                  value={newEducation.degree || ''}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Start Date"
                  type="date"
                  value={newEducation.startDate || ''}
                  onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                  size="small"
                  sx={{ mb: 1 }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={newEducation.endDate || ''}
                  onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  size="small"
                  sx={{ mb: 1 }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Score"
                  type="number"
                  value={newEducation.score ?? ''}
                  onChange={(e) => setNewEducation({ ...newEducation, score: parseFloat(e.target.value) })}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Description"
                  value={newEducation.description || ''}
                  onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                  size="small"
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ mb: 1 }}
                />
                <IconButton onClick={handleSave}>
                  <Save />
                </IconButton>
              </ListItem>
            ) : (
              <ListItem key={edu.id} divider>
                <ListItemText
                  primary={`${edu.degree} at ${edu.institution}`}
                  secondary={
                    <>
                      {edu.startDate} to {edu.endDate}
                      {edu.score && ` | Score: ${edu.score}`}
                      {edu.description && `\n${edu.description}`}
                    </>
                  }
                />
                <IconButton onClick={() => handleEdit(edu.id)}>
                  <Edit />
                </IconButton>
              </ListItem>
            )
          )}

          {isAdding && (
            <ListItem divider sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <TextField
                label="Institution"
                value={newEducation.institution || ''}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                size="small"
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Degree"
                value={newEducation.degree || ''}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                size="small"
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Start Date"
                type="date"
                value={newEducation.startDate || ''}
                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                size="small"
                sx={{ mb: 1 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                type="date"
                value={newEducation.endDate || ''}
                onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                size="small"
                sx={{ mb: 1 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Score"
                type="number"
                value={newEducation.score ?? ''}
                onChange={(e) => setNewEducation({ ...newEducation, score: parseFloat(e.target.value) })}
                size="small"
                sx={{ mb: 1 }}
              />
              <TextField
                label="Description"
                value={newEducation.description || ''}
                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                size="small"
                fullWidth
                multiline
                rows={2}
                sx={{ mb: 1 }}
              />
              <IconButton onClick={handleSave}>
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
              setNewEducation({});
              setEditingId(null);
            }}
          >
            Add Education
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationList;
