import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Card, CardContent,
  Chip, CircularProgress, Box, Alert
} from '@mui/material';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYXNpcy5nb2Vua2EuMTVAZ21haWwuY29tIiwiZXhwIjoxNzc4NzYyMDY0LCJpYXQiOjE3Nzg3NjExNjQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIwZTdkYzIwMS0xNDI3LTQzY2YtYjgzMC04OGEwZGQ5ZTM5MGYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrYXNpcyBnb2Vua2EiLCJzdWIiOiJmOTA1NGVjYi05MzAyLTQ4YmYtYTYyNy02ZGZjNTQ2MjQ2YzEifSwiZW1haWwiOiJrYXNpcy5nb2Vua2EuMTVAZ21haWwuY29tIiwibmFtZSI6Imthc2lzIGdvZW5rYSIsInJvbGxObyI6IjEyMzA0MDMyIiwiYWNjZXNzQ29kZSI6IlRSdlpXcSIsImNsaWVudElEIjoiZjkwNTRlY2ItOTMwMi00OGJmLWE2MjctNmRmYzU0NjI0NmMxIiwiY2xpZW50U2VjcmV0IjoiU1l0andxSFhxS1lBaG5ncSJ9.OWGy0vL0v2UhVPII0b-Bx-6eGhSQMHWbOodyN7opICc";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seen, setSeen] = useState([]);

  useEffect(() => {
    fetch('http://4.224.186.213/evaluation-service/notifications', {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data || !Array.isArray(data.notifications)) {
          throw new Error('Invalid notifications response');
        }
        setNotifications(data.notifications);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load notifications');
        setLoading(false);
      });
  }, []);

  const markSeen = (id) => {
    if (!seen.includes(id)) {
      setSeen([...seen, id]);
    }
  };

  const getColor = (type) => {
    if (type === 'Placement') return 'success';
    if (type === 'Result') return 'warning';
    if (type === 'Event') return 'info';
    return 'default';
  };

  const priorityOrder = {
    Placement: 1,
    Result: 2,
    Event: 3,
  };

  const topNotifications = [...notifications]
    .sort((a, b) => {
      const priorityA = priorityOrder[a.Type] ?? 4;
      const priorityB = priorityOrder[b.Type] ?? 4;
      if (priorityA !== priorityB) return priorityA - priorityB;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={5}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Alert severity="error">{error}</Alert>
  );

  if (topNotifications.length === 0) return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Alert severity="info">No notifications available.</Alert>
    </Container>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Top 10 Notifications
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Priority order: Placement &gt; Result &gt; Event
      </Typography>

      {topNotifications.map((n) => (
        <Card
          key={n.ID}
          elevation={seen.includes(n.ID) ? 1 : 4}
          sx={{
            mb: 2,
            backgroundColor: seen.includes(n.ID) ? '#f9f9f9' : '#ffffff',
            border: seen.includes(n.ID) ? '1px solid #ddd' : '1px solid #1976d2',
            cursor: 'pointer',
          }}
          onClick={() => markSeen(n.ID)}
        >
          <CardContent sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2} flexWrap="wrap">
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6" sx={{ mb: 1 }} noWrap>
                  {n.Message}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {n.Timestamp}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                <Chip
                  label={n.Type}
                  color={getColor(n.Type)}
                  size="small"
                />
                {!seen.includes(n.ID) && (
                  <Chip label="New" color="error" size="small" />
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
