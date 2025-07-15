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
import { Edit, Save, Add, Delete } from '@mui/icons-material';

export interface Certification {
  id: number;
  name: string;
  completionDate: string;
}

interface Props {
  certifications: Certification[];
  userId: number;
}

const CertificationList: React.FC<Props> = ({ certifications: initialCerts, userId }) => {
  const [certifications, setCertifications] = useState<Certification[]>(initialCerts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCert, setNewCert] = useState<Partial<Certification>>({});
  const [isAdding, setIsAdding] = useState(false);

  const resetState = () => {
    setNewCert({});
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (id: number) => {
    const cert = certifications.find((c) => c.id === id);
    if (cert) {
      setNewCert({ ...cert });
      setEditingId(id);
      setIsAdding(false);
    }
  };

  const handleSave = async () => {
    if (!newCert.name || !newCert.completionDate) return;

    try {
      if (editingId !== null) {
        // PUT (Edit)
        const response = await fetch(`http://localhost:8081/users/certificate/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCert),
        });

        if (response.ok) {
          setCertifications((prev) =>
            prev.map((c) =>
              c.id === editingId ? { ...c, ...newCert } as Certification : c
            )
          );
          resetState();
        } else {
          console.error('Failed to update certification');
        }
      } else if (isAdding) {
        // POST (Create)
        const payload = {
          ...newCert,
          userId,
        };
        console.log(payload);
        const response = await fetch(`http://localhost:8081/users/certificate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const savedCert = await response.json();
          setCertifications((prev) => [...prev, savedCert]);
          resetState();
        } else {
          console.error('Failed to add certification');
        }
      }
    } catch (error) {
      console.error('Error saving certification', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/users/certification/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCertifications((prev) => prev.filter((c) => c.id !== id));
        if (editingId === id) resetState();
      } else {
        console.error('Failed to delete certification');
      }
    } catch (error) {
      console.error('Error deleting certification', error);
    }
  };

  const renderCertFields = () => (
    <>
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
    </>
  );

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Certifications
        </Typography>
        <List>
          {certifications.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No certifications available.
            </Typography>
          )}

          {certifications.map((cert) => (
            <ListItem key={cert.id} divider>
              {editingId === cert.id ? (
                renderCertFields()
              ) : (
                <>
                  <ListItemText
                    primary={cert.name}
                    secondary={`Completed on: ${new Date(cert.completionDate).toLocaleDateString()}`}
                  />
                  <IconButton onClick={() => handleEdit(cert.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cert.id)}>
                    <Delete />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}

          {isAdding && <ListItem divider>{renderCertFields()}</ListItem>}
        </List>

        {!isAdding && editingId === null && (
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