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
import { Badge } from '@mui/material';
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
      <Badge badgeContent={sprints.length} color="success" sx={{ mr: 2 }}>
        <Typography variant="h4">Sprints</Typography>
      </Badge>

      <Button variant="outlined" color="primary" onClick={handleOpenModal}>
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
      <Grid container direction="column" spacing={3}>
        {sprints.map((sprint) => (
          // @ts-ignore
          <Grid item key={sprint.id}>
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {sprint.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created on:{' '}
                  {new Date(sprint.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
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
