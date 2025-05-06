import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent
} from '@mui/material';
import CreateSprintModal from '../components/modals/CreateSprintModal';
import CircularProgress from '@mui/material/CircularProgress';
import { Sprint } from '../types/tasksTypes';
import Grid from '@mui/material/Grid';

function Sprints() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchSprints();
  }, []);

  const fetchSprints = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sprints')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching sprints:', error);
    } else {
      setSprints(data);
    }
    setLoading(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">Sprints</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          + Add Sprint
        </Button>
      </Box>


      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            <Typography>Loading sprints...</Typography>
        </Box>
        ) : sprints.length === 0 ? (
        <Card>
            <CardContent>
            <Typography variant="h6" textAlign="center">
                No sprints available.
            </Typography>
            </CardContent>
        </Card>
        ) : (
          <Grid container spacing={2}>
          {sprints.map((sprint) => (
            // @ts-ignore
            <Grid item xs={12} sm={6} md={4} key={sprint.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{sprint.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created on:{' '}
                    {new Date(sprint.created_at).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        )}
      <CreateSprintModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onCreated={fetchSprints}
      />
    </Box>
  );
}

export default Sprints;
