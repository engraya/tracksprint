export type Task = {
  id: string;
  subject: string;
  status: 'Open' | 'Working' | 'Completed';
  parent_id: string | null;
  estimated_hour: number;
  sprint_id: string;
  description: string;
  assignees: string[];
  sprints?: {
    name: string;
  };
};


export type Sprint = {
  id: string;
  name: string;
  created_at: string;
};


export interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
  task: any; 
  isUpdate: boolean; 
}

export interface DeleteTaskModalProps {
    open: boolean;
    onClose: () => void;
    taskId: string; 
    onTaskDeleted: () => void;  
  }

export interface CreateSprintProps {
    open: boolean;
    onClose: () => void;
    onCreated: () => void; 
  }

  export interface Assignee {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }  