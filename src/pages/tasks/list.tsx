import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import { useParams } from 'react-router-dom';
import { MoreVertical, Plus } from 'lucide-react';
import { MOCK_TASKS, STATUS_CONFIG, TaskCardProps } from './tasks-data';
import { useTaskFilters } from './use-task-filters';
import { TaskFiltersComponent } from './task-filters-component';
import { TaskDetailDrawer } from './task-detail-drawer';
import { Button } from '../../components/ui/button';
import { useState } from 'react';

export function TaskList() {
  const { company_id, project_id } = useParams();
  const cId = company_id || '4go';
  const pId = project_id || 'deskreport';

  const [selectedTask, setSelectedTask] = useState<TaskCardProps | null>(null);

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
  } = useTaskFilters(MOCK_TASKS);

  const navigation = [
    { name: 'Quadros', to: `/${cId}/${pId}/tasks/boards` },
    { name: 'Em Lista', to: `/${cId}/${pId}/tasks/list` },
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
          <Button size="md" className='gap-1.5'>
            <Plus size={12} />
            Tarefa
          </Button>
        </div>
      </Topbar>

      <div className='flex-1 overflow-auto transition-colors'>
        <div className='bg-white dark:bg-[#0f0f11] border-b border-zinc-200 dark:border-zinc-800 min-h-full'>
          <table className='w-full text-left border-collapse table-fixed'>
            <thead>
              <tr className='border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 sticky top-0 z-10'>
                <th className='py-2 px-4 text-[10px] font-black text-zinc-400 w-12 border-r border-zinc-200 dark:border-zinc-800'>ID</th>
                <th className='py-2 px-4 text-[10px] font-black text-zinc-400 border-r border-zinc-200 dark:border-zinc-800'>
                  Título
                </th>
                <th className='py-2 px-4 text-[10px] font-black text-zinc-400 w-44 border-r border-zinc-200 dark:border-zinc-800'>
                  Atribuído
                </th>
                <th className='py-2 px-4 text-[10px] font-black text-zinc-400 w-36 border-r border-zinc-200 dark:border-zinc-800'>
                  Status
                </th>
                <th className='py-2 px-2 w-10'></th>
              </tr>
            </thead>
            <tbody className='divide-y divide-zinc-200 dark:divide-zinc-800'>
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className='hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer'
                >
                  <td className='py-1.5 px-4 text-[10px] font-bold text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 text-center'>#{task.id}</td>
                  <td className='py-1.5 px-4 border-r border-zinc-200 dark:border-zinc-800'>
                    <div className='flex items-center gap-2'>
                      <div className={`shrink-0 w-4 h-4 rounded-full border border-emerald-500/40 flex items-center justify-center bg-emerald-500/5`}>
                        <div className='w-1 h-1 rounded-full bg-emerald-500' />
                      </div>
                      <span className='group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-[12px] font-semibold text-zinc-900 dark:text-zinc-200 transition-colors truncate'>
                        {task.title}
                      </span>
                    </div>
                  </td>
                  <td className='py-1.5 px-4 border-r border-zinc-200 dark:border-zinc-800'>
                    {task.assignee ? (
                      <div className='flex items-center gap-1.5'>
                        <img src={task.assignee.avatar} className='w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100' />
                        <span className='text-[11px] text-zinc-600 dark:text-zinc-400 font-medium truncate'>{task.assignee.name}</span>
                      </div>
                    ) : (
                      <span className='text-zinc-300 dark:text-zinc-800 text-[11px]'>—</span>
                    )}
                  </td>
                  <td className='py-1.5 px-4 border-r border-zinc-200 dark:border-zinc-800'>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black border ${STATUS_CONFIG[task.status].color}`}>
                      {STATUS_CONFIG[task.status].label}
                    </span>
                  </td>
                  <td className='py-1.5 px-2 text-center'>
                    <Button size="icon" variant="ghost" className='h-7 w-7'>
                      <MoreVertical size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0f0f11] py-3 px-6 flex items-center justify-between text-[11px] text-zinc-500'>
            <span>Mostrando {filteredTasks.length} tarefas</span>
            <div className='flex items-center gap-1 font-bold'>
              <Button size="sm" variant="ghost">Anterior</Button>
              <Button size="sm">1</Button>
              <Button size="sm" variant="ghost">Próxima</Button>
            </div>
          </div>
        </div>
      </div>
      <TaskDetailDrawer
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </Page>
  );
}
