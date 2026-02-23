import { create } from 'zustand';
import { TaskCardProps } from './tasks-data';

const API_URL = 'http://localhost:3000/tasks';

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
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                set({ tasks: data });
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    },
    addTask: async (task) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            if (response.ok) {
                const newTask = await response.json();
                set((state) => ({ tasks: [newTask, ...state.tasks] }));
            }
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    },
    updateTask: async (id, updates) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (response.ok) {
                const updatedTask = await response.json();
                set((state) => ({
                    tasks: state.tasks.map(t => t.id === id ? updatedTask : t)
                }));
            }
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    },
    deleteTask: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                set((state) => ({
                    tasks: state.tasks.filter(t => t.id !== id)
                }));
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    },
}));

// Load tasks initially
useTaskStore.getState().fetchTasks();
