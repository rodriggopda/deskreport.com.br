import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import { useParams } from 'react-router-dom';
import { Plus, MoreHorizontal } from 'lucide-react';
import { MOCK_TASKS, STATUS_CONFIG, PRIORITY_CONFIG, TaskCardProps } from './tasks-data';
import { useTaskFilters } from './use-task-filters';
import { TaskFiltersComponent } from './task-filters-component';
import { TaskDetailDrawer } from './task-detail-drawer';
import { Button } from '../../components/ui/button';
import { useMemo, useState } from 'react';

export function TaskBoards() {
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

  const dynamicColumns = useMemo(() => {
    if (groupBy === 'status') {
      return Object.entries(STATUS_CONFIG).map(([id, config]) => ({
        id,
        title: config.label,
        color: config.color.split(' ')[2] || 'text-zinc-500' // Extract text color
      }));
    }
    if (groupBy === 'priority') {
      return Object.entries(PRIORITY_CONFIG).map(([id, config]) => ({
        id,
        title: config.label,
        color: config.color
      }));
    }
    if (groupBy === 'project') {
      const uniqueProjects = Array.from(new Set(MOCK_TASKS.map(t => t.project)));
      return uniqueProjects.map(p => ({ id: p, title: p, color: 'text-zinc-500' }));
    }
    if (groupBy === 'assignee') {
      const uniqueAssignees = Array.from(new Set(MOCK_TASKS.filter(t => t.assignee).map(t => t.assignee!.name)));
      return [...uniqueAssignees.map(a => ({ id: a, title: a, color: 'text-zinc-500' })), { id: 'unassigned', title: 'Sem responsável', color: 'text-zinc-400' }];
    }
    return [];
  }, [groupBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedStatus('all');
    setSelectedProject('all');
    setSelectedAssignee('all');
    setSelectedPriority('all');
    setSortBy('newest');
    setGroupBy('status');
  };

  const getTasksForColumn = (columnId: string) => {
    if (groupBy === 'status') return filteredTasks.filter(t => t.status === columnId);
    if (groupBy === 'priority') return filteredTasks.filter(t => t.priority === columnId);
    if (groupBy === 'project') return filteredTasks.filter(t => t.project === columnId);
    if (groupBy === 'assignee') {
      if (columnId === 'unassigned') return filteredTasks.filter(t => !t.assignee);
      return filteredTasks.filter(t => t.assignee?.name === columnId);
    }
    return [];
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

      <div className='flex-1 overflow-x-auto transition-colors selection:bg-blue-100 selection:text-blue-900'>
        <div className='flex h-full items-start'>
          {dynamicColumns.map((column) => (
            <div key={column.id} className='w-[300px] min-w-[300px] shrink-0 h-full flex flex-col border-r border-zinc-200 dark:border-zinc-800/80 last:border-r-0'>
              <div className='px-3 py-4 group bg-white/50 dark:bg-black/10 transition-colors'>
                <div className='flex items-center justify-between mb-1.5'>
                  <div className='flex items-center gap-2'>
                    <h3 className={`font-bold text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-2`}>
                      <span className={`${column.color} text-[10px]`}>●</span>
                      {column.title}
                    </h3>
                    <span className='text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-500 min-w-6 text-center px-1.5 py-0.5 rounded-full font-black border border-zinc-300/50 dark:border-zinc-700/50'>
                      {getTasksForColumn(column.id).length}
                    </span>
                  </div>
                  <MoreHorizontal size={16} className='text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-200' />
                </div>
              </div>

              <div className='flex-1 space-y-2 overflow-y-auto px-2.5 py-2 bg-zinc-50/10 dark:bg-transparent'>
                {getTasksForColumn(column.id).map(task => {
                  const priority = PRIORITY_CONFIG[task.priority];
                  return (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className='bg-white dark:bg-[#161618] border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg hover:border-blue-400 dark:hover:border-blue-500/50 transition-all group relative cursor-pointer ring-0 hover:ring-2 hover:ring-blue-500/10'
                    >
                      <div className='flex items-start justify-between mb-2'>
                        <div className='flex items-center gap-1.5'>
                          <span className={`text-[9px] font-black text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700/50`}>
                            {task.project}
                          </span>
                          <span className='text-[10px] font-bold text-zinc-500'>#{task.id}</span>
                        </div>
                        {task.assignee && (
                          <img
                            src={task.assignee.avatar}
                            className='w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 group-hover:scale-110 transition-transform'
                            title={task.assignee.name}
                          />
                        )}
                      </div>

                      <h4 className='text-[13px] font-semibold text-zinc-900 dark:text-zinc-200 mb-2.5 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                        {task.title}
                      </h4>

                      <div className='flex items-center justify-between mt-auto'>
                        <div className='flex items-center gap-2'>
                          <span className={`flex items-center gap-1 text-[10px] font-bold ${priority.color}`}>
                            <span className='text-[12px]'>{priority.icon}</span>
                            {priority.label}
                          </span>
                          {task.tags && task.tags.length > 0 && (
                            <div className='flex gap-1'>
                              {task.tags.map(tag => (
                                <div key={tag.label} className={`w-1.5 h-1.5 rounded-full ${tag.color.split(' ')[0]}`} />
                              ))}
                            </div>
                          )}
                        </div>
                        <span className='text-[9px] text-zinc-400 font-medium'>
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <Button variant="ghost" className='w-full py-2 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all group'>
                  <Plus size={14} className='group-hover:rotate-90 transition-transform' />
                  Novo item
                </Button>
              </div>
            </div>
          ))}

          {/* New Column Placeholder */}
          <div className='w-[300px] min-w-[300px] h-full flex flex-col shrink-0 px-3 pt-6'>
            <Button variant="outline" className='w-full h-10 gap-2 border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:text-blue-500 hover:border-blue-400 dark:hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all group'>
              <Plus size={16} className='group-hover:scale-110 transition-transform' />
              Adicionar coluna
            </Button>
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
