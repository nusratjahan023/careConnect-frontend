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
  Box,
} from '@mui/material';
import { Edit, Save, Add, Delete } from '@mui/icons-material';

export interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  score: number;
  description: string;
}

interface Props {
  educationList: Education[];
  userId: number;
}

const EducationList: React.FC<Props> = ({ educationList: initialEdu, userId }) => {
  const [educations, setEducations] = useState<Education[]>(initialEdu);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newEdu, setNewEdu] = useState<Partial<Education>>({});
  const [isAdding, setIsAdding] = useState(false);

  const resetState = () => {
    setNewEdu({});
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (id: number) => {
    const edu = educations.find((e) => e.id === id);
    if (edu) {
      setNewEdu({ ...edu });
      setEditingId(id);
      setIsAdding(false);
    }
  };

  const handleSave = async () => {
    const { institution, degree, startDate, endDate, score } = newEdu;
    if (!institution || !degree || !startDate || !endDate || score === undefined) return;

    try {
      if (editingId !== null) {
        const response = await fetch(`http://localhost:8081/users/education/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEdu),
        });

        if (response.ok) {
          setEducations((prev) =>
            prev.map((e) => (e.id === editingId ? { ...e, ...newEdu } as Education : e))
          );
          resetState();
        } else {
          console.error('Failed to update education');
        }
      } else if (isAdding) {
        const payload = {
          ...newEdu,
          userId,
        };
        const response = await fetch(`http://localhost:8081/users/education`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const savedEdu = await response.json();
          setEducations((prev) => [...prev, savedEdu]);
          resetState();
        } else {
          console.error('Failed to add education');
        }
      }
    } catch (error) {
      console.error('Error saving education', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/users/education/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEducations((prev) => prev.filter((e) => e.id !== id));
        if (editingId === id) resetState();
      } else {
        console.error('Failed to delete education');
      }
    } catch (error) {
      console.error('Error deleting education', error);
    }
  };

  const renderEducationFields = () => (
    <Box display="flex" flexDirection="column" gap={1} width="100%">
      <TextField
        label="Institution"
        value={newEdu.institution || ''}
        onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
        size="small"
      />
      <TextField
        label="Degree"
        value={newEdu.degree || ''}
        onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
        size="small"
      />
      <TextField
        label="Start Date"
        type="date"
        value={newEdu.startDate || ''}
        onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        size="small"
      />
      <TextField
        label="End Date"
        type="date"
        value={newEdu.endDate || ''}
        onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        size="small"
      />
      <TextField
        label="Score"
        type="number"
        value={newEdu.score ?? ''}
        onChange={(e) => setNewEdu({ ...newEdu, score: parseFloat(e.target.value) })}
        size="small"
      />
      <TextField
        label="Description"
        multiline
        rows={2}
        value={newEdu.description || ''}
        onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
        size="small"
      />
      <IconButton onClick={handleSave} sx={{ alignSelf: 'flex-start' }}>
        <Save />
      </IconButton>
    </Box>
  );

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Education
        </Typography>
        <List>
          {educations.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No education records available.
            </Typography>
          )}

          {educations.map((edu) => (
            <ListItem key={edu.id} divider alignItems="flex-start">
              {editingId === edu.id ? (
                renderEducationFields()
              ) : (
                <>
                  <ListItemText
                    primary={`${edu.degree} @ ${edu.institution}`}
                    secondary={
                      <>
                        {`From ${new Date(edu.startDate).toLocaleDateString()} to ${new Date(edu.endDate).toLocaleDateString()}`}<br />
                        {`Score: ${edu.score}`}<br />
                        {edu.description}
                      </>
                    }
                  />
                  <IconButton onClick={() => handleEdit(edu.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(edu.id)}>
                    <Delete />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}

          {isAdding && <ListItem divider>{renderEducationFields()}</ListItem>}
        </List>

        {!isAdding && editingId === null && (
          <Button
            startIcon={<Add />}
            onClick={() => {
              setIsAdding(true);
              setNewEdu({});
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