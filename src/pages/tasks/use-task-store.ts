import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TaskCardProps } from './tasks-data';

interface TaskStore {
    tasks: TaskCardProps[];
    setTasks: (tasks: TaskCardProps[]) => void;
    addTask: (task: TaskCardProps) => void;
    updateTask: (id: string, updates: Partial<TaskCardProps>) => void;
    deleteTask: (id: string) => void;
}

const INITIAL_REALISTIC_TASKS: TaskCardProps[] = [
    {
        id: 'DR-001',
        title: 'Integrar API real do WhatsApp (Embedded Signup)',
        project: 'deskreport',
        status: 'todo',
        priority: 'urgent',
        createdAt: '2024-02-23T09:00:00Z',
        assignee: { name: 'rodriggopda', avatar: 'https://github.com/rodriggopda.png' },
        tags: [{ label: 'Feature', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }, { label: 'WhatsApp', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' }]
    },
    {
        id: 'DR-002',
        title: 'Refatorar Drawer de Tarefas para usar RichEditor',
        project: 'deskreport',
        status: 'done',
        priority: 'high',
        createdAt: '2024-02-22T10:00:00Z',
        tags: [{ label: 'UI/UX', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' }]
    },
    {
        id: 'DR-003',
        title: 'Implementar Persistência de Dados (LocalStorage/JSON)',
        project: 'deskreport',
        status: 'in-progress',
        priority: 'high',
        createdAt: '2024-02-23T10:30:00Z',
        tags: [{ label: 'Core', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }]
    },
    {
        id: 'DR-004',
        title: 'Criar Página de Gerenciamento de Dados (Import/Export)',
        project: 'deskreport',
        status: 'todo',
        priority: 'medium',
        createdAt: '2024-02-23T11:00:00Z',
        tags: [{ label: 'Feature', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }]
    },
    {
        id: 'DR-005',
        title: 'Ajustar Responsividade do Kanban',
        project: 'deskreport',
        status: 'backlog',
        priority: 'medium',
        createdAt: '2024-02-21T14:00:00Z',
        tags: [{ label: 'Bug', color: 'bg-red-500/10 text-red-500 border-red-500/20' }]
    },
    {
        id: 'DR-006',
        title: 'Implementar Sistema de Notificações em Tempo Real',
        project: 'deskreport',
        status: 'backlog',
        priority: 'high',
        createdAt: '2024-02-20T09:00:00Z',
        tags: [{ label: 'Core', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }]
    },
    {
        id: 'DR-007',
        title: 'Finalizar Padronização de Botões (UI Kit)',
        project: 'deskreport',
        status: 'review',
        priority: 'low',
        createdAt: '2024-02-23T14:00:00Z',
        tags: [{ label: 'UI/UX', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' }]
    },
    {
        id: 'DR-008',
        title: 'Dashboard de Analytics e Métricas',
        project: 'deskreport',
        status: 'todo',
        priority: 'medium',
        createdAt: '2024-02-19T11:00:00Z',
        tags: [{ label: 'Analytics', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' }]
    }
];

export const useTaskStore = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: INITIAL_REALISTIC_TASKS,
            setTasks: (tasks) => set({ tasks }),
            addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
            })),
            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter(t => t.id !== id)
            })),
        }),
        {
            name: 'deskreport-tasks-storage',
        }
    )
);
