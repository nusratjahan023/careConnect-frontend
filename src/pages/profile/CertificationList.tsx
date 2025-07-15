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

export interface Certification {
  id: number;
  user_details_id
  name: string;
  completionDate: string;
}

interface Props {
  certifications: Certification[];
}

const CertificationList: React.FC<Props> = ({ certifications: initialCerts }) => {
  const [certifications, setCertifications] = useState<Certification[]>(initialCerts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCert, setNewCert] = useState<Partial<Certification>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (id: number) => {
    setEditingId(id);
    const cert = certifications.find((c) => c.id === id);
    if (cert) setNewCert({ ...cert });
  };

const handleSave = async () => {
  if (!newCert.name || !newCert.completionDate) return;

  if (editingId !== null) {
    // Update existing certification
    try {
      const response = await fetch(`/api/certifications/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCert),
      });

      if (response.ok) {
        setCertifications((prev) =>
          prev.map((c) => (c.id === editingId ? { ...c, ...newCert } as Certification : c))
        );
        setEditingId(null);
        setNewCert({});
      } else {
        console.error("Failed to update certification");
      }
    } catch (error) {
      console.error("Error updating certification", error);
    }
  } else {
    // Create new certification
    try {
      const response = await fetch(`/api/certifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCert),
      });

      if (response.ok) {
        const savedCert = await response.json();
        setCertifications((prev) => [...prev, savedCert]);
        setIsAdding(false);
        setNewCert({});
      } else {
        console.error("Failed to add certification");
      }
    } catch (error) {
      console.error("Error adding certification", error);
    }
  }
};

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <List>
          {certifications.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No certifications available.
            </Typography>
          )}
          {certifications.map((cert) =>
            editingId === cert.id ? (
              <ListItem key={cert.id} divider>
                <TextField
                  label="Name"
                  value={newCert.name || ''}
                  onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <TextField
                  label="Completion Date"
                  type="date"
                  value={newCert.completionDate || ''}
                  onChange={(e) => setNewCert({ ...newCert, completionDate: e.target.value })}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                <IconButton onClick={handleSave}>
                  <Save />
                </IconButton>
              </ListItem>
            ) : (
              <ListItem key={cert.id} divider>
                <ListItemText
                  primary={cert.name}
                  secondary={`Completed on: ${new Date(cert.completionDate).toLocaleDateString()}`}
                />
                <IconButton onClick={() => handleEdit(cert.id)}>
                  <Edit />
                </IconButton>
              </ListItem>
            )
          )}

          {isAdding && (
            <ListItem divider>
              <TextField
                label="Name"
                value={newCert.name || ''}
                onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                size="small"
                sx={{ mr: 1 }}
              />
              <TextField
                label="Completion Date"
                type="date"
                value={newCert.completionDate || ''}
                onChange={(e) => setNewCert({ ...newCert, completionDate: e.target.value })}
                size="small"
                InputLabelProps={{ shrink: true }}
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
              setNewCert({});
              setEditingId(null);
            }}
          >
            Add Certification
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationList;
