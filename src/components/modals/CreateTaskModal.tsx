import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-toastify';
import { CreateTaskModalProps } from '../../types/tasksTypes';
import { statusOptions } from '../../lib/status';
import { Sprint, Task } from '../../types/tasksTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


function CreateTaskModal({ open, onClose, onTaskCreated, task, isUpdate }: CreateTaskModalProps) {
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Open');
  const [parentId, setParentId] = useState('');
  const [estimatedHour, setEstimatedHour] = useState('');
  const [sprintId, setSprintId] = useState('');
  const [description, setDescription] = useState('');
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [parentTasks, setParentTasks] = useState<Task[]>([]);
  const [warning, setWarning] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    if (open) {
      fetchSprints();
      fetchParentTasks();
      if (isUpdate && task) {
        // Prefill the form with the task data when in update mode
        setSubject(task.subject);
        setStatus(task.status);
        setParentId(task.parent_id || '');
        setEstimatedHour(String(task.estimated_hour));
        setSprintId(task.sprint_id || '');
        setDescription(task.description);
      }
    } else {
      // Clear form when modal is closed
      setSubject('');
      setStatus('Open');
      setParentId('');
      setEstimatedHour('');
      setSprintId('');
      setDescription('');
      setErrors({});
      setWarning('');
    }
  }, [open, isUpdate, task]);

  const fetchSprints = async () => {
    const { data } = await supabase.from('sprints').select('*');
    setSprints(data || []);
  };

  const fetchParentTasks = async () => {
    const { data } = await supabase.from('tasks').select('*');
    if (!data) return;
    const validParents = data.filter((task) => !task.parent_id);
    setParentTasks(validParents);
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (!subject) newErrors.subject = 'Subject is required';
    if (!status) newErrors.status = 'Status is required';
    if (!estimatedHour || isNaN(Number(estimatedHour))) newErrors.estimatedHour = 'Valid hour is required';
    if (!sprintId) newErrors.sprintId = 'Sprint is required';
    if (!description) newErrors.description = 'Description is required';
  
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
  
    // Validate parent task rule
    if (parentId) {
      const { data: childCheck } = await supabase
        .from('tasks')
        .select('id')
        .eq('parent_id', parentId);
      if (childCheck && childCheck.length > 0) {
        setWarning('Cannot assign a child to a task that already has a parent.');
        return;
      }
    }
  
    setLoading(true);
  
    let error;
  
    if (isUpdate && task) {
      // Update the task
      const { error: updateError } = await supabase
        .from('tasks')
        .update({
          subject,
          status,
          parent_id: parentId || null,
          estimated_hour: Number(estimatedHour),
          sprint_id: sprintId,
          description,
        })
        .eq('id', task.id);
  
      error = updateError;
      if (!error) {
        toast.success('Task updated successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    } else {
      // Create a new task
      const { error: insertError } = await supabase.from('tasks').insert([{
        subject,
        status,
        parent_id: parentId || null,
        estimated_hour: Number(estimatedHour),
        sprint_id: sprintId,
        user_id: currentUser?.id,
        description,
      }]);
  
      error = insertError;
      if (!error) {
        toast.success('Task created successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    }
  
    setLoading(false);
    handleClose();
  
    if (error) {
      console.error('Error saving task:', error);
      toast.error(error.message || "Error saving task", {
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
      onTaskCreated();
    }
  };
  

  const handleClose = () => {
    onClose();
    fetchSprints();
    fetchParentTasks();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{isUpdate ? 'Update Task' : 'Create New Task'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={!!errors.subject}
            helperText={errors.subject}
            fullWidth
          />
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            error={!!errors.status}
            helperText={errors.status}
            fullWidth
          >
            {statusOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Parent Task (optional)"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            {parentTasks.map((task: any) => (
              <MenuItem key={task.id} value={task.id}>{task.subject}</MenuItem>
            ))}
          </TextField>
          {warning && <Alert severity="warning">{warning}</Alert>}
          <TextField
            label="Estimated Hour"
            type="number"
            value={estimatedHour}
            onChange={(e) => setEstimatedHour(e.target.value)}
            error={!!errors.estimatedHour}
            helperText={errors.estimatedHour}
            fullWidth
          />
          <TextField
            select
            label="Related Sprint"
            value={sprintId}
            onChange={(e) => setSprintId(e.target.value)}
            error={!!errors.sprintId}
            helperText={errors.sprintId}
            fullWidth
          >
            {sprints.map((sprint: any) => (
              <MenuItem key={sprint.id} value={sprint.id}>{sprint.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            multiline
            minRows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {loading ? <CircularProgress size={20} /> : isUpdate ? 'Update Task' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskModal;
