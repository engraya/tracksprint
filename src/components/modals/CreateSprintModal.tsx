import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { supabase } from '../../lib/supabase';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toast } from 'react-toastify';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void; 
}

const CreateSprintModal: React.FC<Props> = ({ open, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const handleSubmit = async () => {
    if (!name.trim()) {
    toast.error("Sprint name is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
      return;
    }

    if (!currentUser) {
      toast.error("User not authenticated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('sprints').insert([
      {
        name,
        user_id: currentUser.id,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Failed to create sprint", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    } else {
    toast.success('Sprint created successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
      setName('');
      onCreated(); 
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Sprint</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Sprint Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSprintModal;
