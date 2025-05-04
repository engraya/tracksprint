// src/components/UpdateTaskModal.tsx
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
  
  interface UpdateTaskModalProps {
    open: boolean;
    onClose: () => void;
    onUpdated: () => void;
    task: any; // Ideally should be typed properly
  }
  
  const statusOptions = ['Open', 'Working', 'Completed'];
  
  function UpdateTaskModal({ open, onClose, onUpdated, task }: UpdateTaskModalProps) {
    const [subject, setSubject] = useState('');
    const [status, setStatus] = useState('Open');
    const [parentId, setParentId] = useState('');
    const [estimatedHour, setEstimatedHour] = useState('');
    const [sprintId, setSprintId] = useState('');
    const [description, setDescription] = useState('');
    const [sprints, setSprints] = useState([]);
    const [parentTasks, setParentTasks] = useState([]);
    const [warning, setWarning] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (open && task) {
        fetchSprints();
        fetchParentTasks();
        setSubject(task.subject || '');
        setStatus(task.status || 'Open');
        setParentId(task.parent_id || '');
        setEstimatedHour(task.estimated_hour?.toString() || '');
        setSprintId(task.sprint_id || '');
        setDescription(task.description || '');
      }
    }, [open, task]);
  
    const fetchSprints = async () => {
      const { data } = await supabase.from('sprints').select('*');
      setSprints(data || []);
    };
  
    const fetchParentTasks = async () => {
      const { data } = await supabase.from('tasks').select('*');
      if (!data) return;
      const validParents = data.filter((t) => !t.parent_id && t.id !== task.id); // Exclude current task
      setParentTasks(validParents);
    };
  
    const handleUpdate = async () => {
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
      const { error } = await supabase
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
  
      setLoading(false);
      if (error) {
        console.error('Error updating task:', error);
        toast.error(error.message || 'Error updating task.', {
          position: 'top-center',
          autoClose: 5000,
        });
      } else {
        onUpdated();
        handleClose();
      }
    };
  
    const handleClose = () => {
      setSubject('');
      setStatus('Open');
      setParentId('');
      setEstimatedHour('');
      setSprintId('');
      setDescription('');
      setErrors({});
      setWarning('');
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Update Task</DialogTitle>
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
              {parentTasks.map((t: any) => (
                <MenuItem key={t.id} value={t.id}>{t.subject}</MenuItem>
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
              {sprints.map((s: any) => (
                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
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
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            {loading ? <CircularProgress size={20} /> : 'Update Task'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default UpdateTaskModal;
  