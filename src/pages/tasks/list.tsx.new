import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import { useParams } from 'react-router-dom';
import { Power, Settings2, Plus, Users2 } from 'lucide-react';
import { STATUS_CONFIG, TaskCardProps } from './tasks-data';
import { useTaskStore } from './use-task-store';
import { useTaskFilters } from './use-task-filters';
import { TaskFiltersComponent } from './task-filters-component';
import { TaskDetailDrawer } from './task-detail-drawer';
import { TaskFormModal } from './task-form-modal';
import { Button } from '../../components/ui/button';
import { useState } from 'react';

export function TaskList() {
  const { company_id, project_id } = useParams();
  const cId = company_id || '4go';
  const pId = project_id || 'deskreport';

  const { tasks } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<TaskCardProps | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskCardProps | null>(null);

  const {
    search,
    setSearch,
    selectedStatus,
    setSelectedStatus,
    selectedProject,
    setSelectedProject,
    projects,
    selectedAssignee,
    setSelectedAssignee,
    assignees,
    selectedPriority,
    setSelectedPriority,
    sortBy,
    setSortBy,
    groupBy,
    setGroupBy,
    filteredTasks
  } = useTaskFilters(tasks);

  const navigation = [
    { name: 'Quadros', to: `/${cId}/${pId}/tasks/boards` },
    { name: 'Em Lista', to: `/${cId}/${pId}/tasks/list` },
    { name: 'Gestão de Dados', to: `/${cId}/${pId}/tasks/management` },
  ]

  const clearFilters = () => {
    setSearch('');
    setSelectedStatus('all');
    setSelectedProject('all');
    setSelectedAssignee('all');
    setSelectedPriority('all');
    setSortBy('newest');
    setGroupBy('status');
  };

  return (
    <Page navigation={navigation}>
      <Topbar title='Tarefas' smartHeader inputSearch='off'>
        <div className='flex items-center gap-3'>
          <TaskFiltersComponent
            search={search}
            setSearch={setSearch}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            projects={projects}
            selectedAssignee={selectedAssignee}
            setSelectedAssignee={setSelectedAssignee}
            assignees={assignees}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            sortBy={sortBy}
            setSortBy={setSortBy}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            onClear={clearFilters}
          />
          <div className='w-px h-3.5 bg-zinc-200 dark:bg-zinc-800' />
          <Button size="md" className='gap-1.5' onClick={() => { setTaskToEdit(null); setIsFormOpen(true); }}>
            <Plus size={12} />
            Tarefa
          </Button>
        </div>
      </Topbar>

      <div className='flex-1 overflow-auto transition-colors p-6 bg-zinc-50 dark:bg-transparent'>
        <div className='max-w-6xl mx-auto space-y-3'>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-20 text-zinc-500 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
              Nenhuma tarefa encontrada com os filtros atuais.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className='bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group cursor-pointer'
              >
                <div className='flex items-center gap-4 flex-1 min-w-0'>
                  {/* Task ID / Visual Indicator */}
                  <div className='flex flex-col items-center justify-center min-w-[48px] h-12 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50'>
                    <span className='text-[10px] font-black text-zinc-400'>ID</span>
                    <span className='text-xs font-bold text-zinc-900 dark:text-zinc-100'>#{String(task.shortId || 0).padStart(3, '0')}</span>
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                        {task.title}
                      </h4>
                    </div>

                    <div className='flex items-center gap-4'>
                      {/* Assignee */}
                      <div className='flex items-center gap-1.5'>
                        {task.assignee ? (
                          <>
                            <img src={task.assignee.avatar} className='w-4 h-4 rounded-full border border-zinc-200 dark:border-zinc-800' />
                            <span className='text-[11px] font-medium text-zinc-500 dark:text-zinc-400'>{task.assignee.name}</span>
                          </>
                        ) : (
                          <span className='text-[11px] font-medium text-zinc-400 italic'>Sem responsável</span>
                        )}
                      </div>

                      <div className='w-px h-3 bg-zinc-200 dark:bg-zinc-800' />

                      {/* Team */}
                      <div className='flex items-center gap-1.5'>
                        <Users2 size={12} className={task.team ? 'text-blue-500' : 'text-zinc-300'} />
                        <span className={`text-[11px] font-medium ${task.team ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-400 italic'}`}>
                          {task.team?.name || 'Sem equipe'}
                        </span>
                      </div>

                      <div className='w-px h-3 bg-zinc-200 dark:bg-zinc-800' />

                      {/* Status */}
                      <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tight`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[task.status].color.split(' ')[0]}`} />
                        <span className='text-zinc-500 dark:text-zinc-400'>{STATUS_CONFIG[task.status].label}</span>
                      </div>

                      <div className='w-px h-3 bg-zinc-200 dark:bg-zinc-800' />

                      {/* Date */}
                      <span className='text-[10px] text-zinc-400 font-medium'>
                        Criada em {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-1.5 ml-4'>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSelectedTask(task)}
                    className="text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    title="Acessar Detalhes"
                  >
                    <Power size={18} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskToEdit(task);
                      setIsFormOpen(true);
                    }}
                    title="Editar Tarefa"
                  >
                    <Settings2 size={18} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <TaskDetailDrawer
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onEdit={() => {
          setTaskToEdit(selectedTask);
          setSelectedTask(null);
          setIsFormOpen(true);
        }}
      />
      <TaskFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setTaskToEdit(null);
        }}
        task={taskToEdit}
      />
    </Page>
  );
}
