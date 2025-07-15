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

export interface Language {
  id: number;
  user_details_id?: number;
  name: string;
  proficiency: string;
}

interface Props {
  languages: Language[];
}

const LanguageList: React.FC<Props> = ({ languages: initialLanguages }) => {
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newLang, setNewLang] = useState<Partial<Language>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (id: number) => {
    setEditingId(id);
    const lang = languages.find((l) => l.id === id);
    if (lang) setNewLang({ ...lang });
  };

  const handleSave = async () => {
    if (!newLang.name || !newLang.proficiency) return;

    if (editingId !== null) {
      try {
        const response = await fetch(`/api/languages/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLang),
        });

        if (response.ok) {
          setLanguages((prev) =>
            prev.map((l) => (l.id === editingId ? { ...l, ...newLang } as Language : l))
          );
          setEditingId(null);
          setNewLang({});
        } else {
          console.error("Failed to update language");
        }
      } catch (error) {
        console.error("Error updating language", error);
      }
    } else {
      try {
        const response = await fetch(`/api/languages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLang),
        });

        if (response.ok) {
          const savedLang = await response.json();
          setLanguages((prev) => [...prev, savedLang]);
          setIsAdding(false);
          setNewLang({});
        } else {
          console.error("Failed to add language");
        }
      } catch (error) {
        console.error("Error adding language", error);
      }
    }
  };

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Languages
        </Typography>
        <List>
          {languages.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No languages listed.
            </Typography>
          )}
          {languages.map((lang) =>
            editingId === lang.id ? (
              <ListItem key={lang.id} divider>
                <TextField
                  label="Name"
                  value={newLang.name || ''}
                  onChange={(e) => setNewLang({ ...newLang, name: e.target.value })}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <TextField
                  label="Proficiency"
                  value={newLang.proficiency || ''}
                  onChange={(e) => setNewLang({ ...newLang, proficiency: e.target.value })}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={handleSave}>
                  <Save />
                </IconButton>
              </ListItem>
            ) : (
              <ListItem key={lang.id} divider>
                <ListItemText
                  primary={lang.name}
                  secondary={`Proficiency: ${lang.proficiency}`}
                />
                <IconButton onClick={() => handleEdit(lang.id)}>
                  <Edit />
                </IconButton>
              </ListItem>
            )
          )}

          {isAdding && (
            <ListItem divider>
              <TextField
                label="Name"
                value={newLang.name || ''}
                onChange={(e) => setNewLang({ ...newLang, name: e.target.value })}
                size="small"
                sx={{ mr: 1 }}
              />
              <TextField
                label="Proficiency"
                value={newLang.proficiency || ''}
                onChange={(e) => setNewLang({ ...newLang, proficiency: e.target.value })}
                size="small"
                sx={{ mr: 1 }}
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
              setNewLang({});
              setEditingId(null);
            }}
          >
            Add Language
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguageList;
