import { useEffect, useState, useCallback  } from 'react';
import {
  Box,
  Typography,
  Button,
  Collapse,
  List,
  ListItemText,
  Divider,
  Chip,
  Card,
  CardContent,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { supabase } from '../lib/supabase';
import CreateTaskModal from '../components/modals/CreateTaskModal';
import DeleteTaskModal from '../components/modals/DeleteTaskModal';
import { Task } from '../types/tasksTypes';
import ListItem from '@mui/material/ListItem';

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

 

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select(`*, sprints(name)`)
      .order('created_at');

    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data || []);
      const defaultExpanded = (data || []).reduce((acc, task) => {
        if (buildTree(data, task.id).length > 0) {
          acc[task.id] = true;
        }
        return acc;
      }, {});
      setExpanded(defaultExpanded);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks(); // ✅ Now safe
  }, [fetchTasks]);

  const buildTree = (tasks: Task[], parentId: string | null = null): Task[] =>
    tasks.filter((task) => task.parent_id === parentId);
  

  // const toggleExpand = (id) => {
  //   setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  // };

  const handleTaskClick = (task : Task) => {
    // Set selected task for updating and open the update modal
    setSelectedTask(task);
    setIsUpdate(true);
    setOpenModal(true);
  };

const handleContextMenu = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  task: Task
) => {
  e.preventDefault(); // Prevent the default right-click menu
  setSelectedTask(task); // Store selected task
  setAnchorEl(e.currentTarget); // Open the custom context menu
};


  const handleMenuClose = () => {
    setAnchorEl(null); // Close the context menu
  };

  const handleDeleteTask = () => {
    setOpenDeleteModal(true); // Open the delete task confirmation modal
    handleMenuClose(); // Close the context menu
  };

  const renderTasks = (parentId: string | null = null, depth = 0) => {
    const parentTasks = buildTree(tasks, parentId).slice(0, visibleCount);

    return parentTasks.map((task) => {
      const children = buildTree(tasks, task.id);
      const totalHours = children.length
        ? children.reduce((sum, child) => sum + child.estimated_hour, 0)
        : task.estimated_hour;

      return (
        <Box key={task.id} sx={{ pl: depth * 4, borderLeft: depth ? '2px solid #ccc' : 'none', my: 1 }}>
          <ListItem
            button
            onClick={() => handleTaskClick(task)}
            onContextMenu={(e) => handleContextMenu(e, task)}  
          >
            <ListItemText
              primary={
                <Box display="flex" gap={1} alignItems="center">
                  <Typography fontWeight={600}>{task.subject}</Typography>
                  {children.length > 0 && (
                    <Chip label="Parent" color="primary" size="small" />
                  )}
                </Box>
              }
              secondary={
                <>
                  <Typography variant="body2">Status: {task.status}</Typography>
                  <Typography variant="body2">Estimated Hours: {totalHours}</Typography>
                  <Typography variant="body2">
                    Sprint: {task.sprints?.name || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    Assignee: {task.profiles?.full_name || 'N/A'}
                  </Typography>
                </>
              }
            />
            {children.length > 0 && (expanded[task.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItem>
          <Collapse in={expanded[task.id]} timeout="auto" unmountOnExit>
            {children.length > 0 && renderTasks(task.id, depth + 1)}
          </Collapse>
          <Divider />
        </Box>
      );
    });
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Task Tree View</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenModal(true);
            setSelectedTask(null);
            setIsUpdate(false); 
          }}
        >
          + Create Task
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
          <Typography>Loading tasks...</Typography>
        </Box>
      ) : tasks.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" textAlign="center">
              No tasks available.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <List>{renderTasks()}</List>
      )}

      {tasks.length > visibleCount && (
        <Box textAlign="center" mt={2}>
          <Button onClick={() => setVisibleCount((prev) => prev + 5)}>Load More</Button>
        </Box>
      )}

      {/* Conditionally render the CreateTaskModal or UpdateTaskModal based on isUpdate */}
      <CreateTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onTaskCreated={fetchTasks}
        task={selectedTask}  // Task data is passed here (null for creating)
        isUpdate={isUpdate}  // Decide if it's create or update mode
      />

      {/* Delete Task Confirmation Modal */}
      {selectedTask && (
        <DeleteTaskModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          taskId={selectedTask.id}
          onTaskDeleted={fetchTasks}
        />
      )}

      {/* Custom Right-click Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteTask}>Delete Task</MenuItem>
      </Menu>
    </Box>
  );
}

export default Tasks;
