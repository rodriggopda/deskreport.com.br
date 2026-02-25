import { create } from 'zustand';
import { authClient } from '../../lib/auth-client';
import { TaskCardProps } from './tasks-data';

const API_URL = 'http://localhost:3000/tasks';

// URL route is typically /:company_id/... so we can extract it for the headers
const getOrgId = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.split('/');
    return path[1] || 'deskreport';
  }
  return 'deskreport';
};

interface TaskStore {
  tasks: TaskCardProps[];
  setTasks: (tasks: TaskCardProps[]) => void;
  addTask: (task: Omit<TaskCardProps, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<TaskCardProps>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  fetchTasks: async () => {
    try {
      const { data, error } = await authClient.$fetch<TaskCardProps[]>(API_URL, {
        headers: { 'x-organization-id': getOrgId() }
      });
      if (!error && data) {
        set({ tasks: data });
      } else if (error) {
        console.error('Failed to fetch tasks:', error);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  },
  addTask: async (task) => {
    try {
      const { data, error } = await authClient.$fetch<TaskCardProps>(API_URL, {
        method: 'POST',
        body: task,
        headers: { 'x-organization-id': getOrgId() }
      });
      if (!error && data) {
        set((state) => ({ tasks: [data, ...state.tasks] }));
      } else if (error) {
        console.error('Failed to add task:', error);
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },
  updateTask: async (id, updates) => {
    try {
      const { data, error } = await authClient.$fetch<TaskCardProps>(`${API_URL}/${id}`, {
        method: 'PUT',
        body: updates,
        headers: { 'x-organization-id': getOrgId() }
      });
      if (!error && data) {
        set((state) => ({
          tasks: state.tasks.map(t => t.id === id ? data : t)
        }));
      } else if (error) {
        console.error('Failed to update task:', error);
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  },
  deleteTask: async (id) => {
    try {
      const { error } = await authClient.$fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'x-organization-id': getOrgId() }
      });
      if (!error) {
        set((state) => ({
          tasks: state.tasks.filter(t => t.id !== id)
        }));
      } else if (error) {
        console.error('Failed to delete task:', error);
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  },
}));

// Load tasks initially if running on client
if (typeof window !== 'undefined') {
  useTaskStore.getState().fetchTasks();
}
