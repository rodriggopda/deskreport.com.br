import { useState, useEffect } from 'react';
import { Button, Dialog } from '../../components/ui';
import { useTaskStore } from './use-task-store';
import { TaskStatus, TaskPriority, STATUS_CONFIG, PRIORITY_CONFIG, TaskCardProps } from './tasks-data';
import { useTenantStore } from '../../store';
import { useOrganization } from '../../lib/auth-client';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: TaskCardProps | null;
  defaultProject?: string;
}

export function TaskFormModal({ isOpen, onClose, task, defaultProject }: TaskFormModalProps) {
  const { addTask, updateTask } = useTaskStore();
  const { projects } = useTenantStore();
  const { data: orgData } = useOrganization();
  const members = orgData?.members || [];

  const selectableProjects = projects.filter(p => p.id !== 'all');

  const [title, setTitle] = useState('');
  const [project, setProject] = useState(selectableProjects[0]?.id || '');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assigneeId, setAssigneeId] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setProject(task.project);
      setStatus(task.status);
      setPriority(task.priority);
      setAssigneeId((task as any).assigneeId || '');
    } else {
      setTitle('');
      setProject(defaultProject || selectableProjects[0]?.id || '');
      setStatus('todo');
      setPriority('medium');
      setAssigneeId('');
    }
  }, [task, isOpen, defaultProject, selectableProjects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (task) {
      updateTask(task.id, {
        title,
        project,
        status,
        priority,
        assigneeId: assigneeId || null
      });
    } else {
      addTask({
        title,
        project,
        status,
        priority,
        assigneeId: assigneeId || null,
        tags: [],
      });
    }

    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Editar Tarefa' : 'Nova Tarefa'}
      maxWidth="md"
      footer={(
        <>
          <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="task-form" className="flex-1">
            {task ? 'Salvar Alterações' : 'Criar Tarefa'}
          </Button>
        </>
      )}
    >
      <form id="task-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-zinc-400">Título da Tarefa</label>
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="O que precisa ser feito?"
            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-zinc-400">Projeto</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all font-medium"
            >
              {selectableProjects.length === 0 ? (
                <option value="">Sem projetos cadastrados</option>
              ) : (
                selectableProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))
              )}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-zinc-400">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all font-medium"
            >
              {Object.entries(STATUS_CONFIG).map(([id, config]) => (
                <option key={id} value={id}>{config.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 col-span-2">
            <label className="text-[10px] font-black uppercase text-zinc-400">Responsável (Assignee)</label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all font-medium"
            >
              <option value="">-- Sem Responsável --</option>
              {members.map(member => (
                <option key={member.id} value={member.userId}>{member.user?.name || member.user?.email}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="text-[10px] font-black uppercase text-zinc-400">Prioridade</label>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(PRIORITY_CONFIG).map(([id, config]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPriority(id as TaskPriority)}
                className={`py-2 rounded-lg border text-[10px] font-black transition-all ${priority === id
                  ? `border-current ${config.color} bg-zinc-50 dark:bg-zinc-800 ring-2 ring-current ring-offset-2 dark:ring-offset-zinc-900`
                  : 'border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </Dialog>
  );
}
