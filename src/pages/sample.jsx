import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Card, CardContent,
  Chip, CircularProgress, Box, Alert
} from '@mui/material';

const TOKEN = "paste-your-token-here";

function Notifications() {
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
        setNotifications(data.notifications);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load notifications");
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

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={5}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Alert severity="error">{error}</Alert>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📢 All Notifications
      </Typography>

      {notifications.map((n) => (
        <Card
          key={n.ID}
          sx={{
            mb: 2,
            backgroundColor: seen.includes(n.ID) ? '#f5f5f5' : '#ffffff',
            border: seen.includes(n.ID) ? '1px solid #ccc' : '1px solid #1976d2',
            cursor: 'pointer'
          }}
          onClick={() => markSeen(n.ID)}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">{n.Message}</Typography>
              <Chip
                label={n.Type}
                color={getColor(n.Type)}
                size="small"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {n.Timestamp}
            </Typography>
            {!seen.includes(n.ID) && (
              <Chip label="New" color="error" size="small" sx={{ mt: 1 }} />
            )}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Notifications;
