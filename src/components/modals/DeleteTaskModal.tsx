import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
  } from '@mui/material';
  import { supabase } from '../../lib/supabase';
  import { toast } from 'react-toastify';
  import { useState } from 'react';
  import { DeleteTaskModalProps } from '../../types/tasksTypes';

  
  function DeleteTaskModal({ open, onClose, taskId, onTaskDeleted }: DeleteTaskModalProps) {
    const [loading, setLoading] = useState(false);
  
    const handleDelete = async () => {
      setLoading(true);
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
  
      setLoading(false);
      if (error) {
        console.error('Error deleting task:', error);
        toast.error(error.message || "Error deleting task", {
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
        toast.success('Task deleted successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        onTaskDeleted();
        onClose(); 
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Delete Task'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default DeleteTaskModal;
  