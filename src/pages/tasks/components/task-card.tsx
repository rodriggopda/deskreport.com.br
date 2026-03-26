import { PRIORITY_CONFIG, TaskCardProps } from '../tasks-data';
import { useDraggable } from '@dnd-kit/react';

export function TaskCard({ task }: { task: TaskCardProps }) {
  const priority = PRIORITY_CONFIG[task.priority];
  const { ref } = useDraggable({ id: task.id });

  return (
    <div
      id={task.id}
      ref={ref}
      key={task.id}
      onClick={() => {
        // setSelectedTask(task);
        // setIsDetailOpen(true);
      }}
      className='bg-white dark:bg-[#161618] border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg hover:border-blue-400 dark:hover:border-blue-500/50 transition-all group relative cursor-pointer ring-0 hover:ring-2 hover:ring-blue-500/10'
    >
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center gap-1.5'>
          <span
            className={`text-[9px] font-black text-zinc-500 dark:text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 max-w-24 truncate`}
          >
            {/*{getProjectName(task.project)}*/}
          </span>
          {priority && <span className={`flex items-center gap-1 text-[9px] font-black ${priority.color}`}>{priority.label}</span>}
        </div>
        {task.assignees && task.assignees.length > 0 && (
          <div className='flex -space-x-1.5 overflow-hidden'>
            {task.assignees.slice(0, 3).map((a, i) => (
              <img
                key={i}
                src={a.avatar}
                className='w-6 h-6 rounded-full border border-white dark:border-zinc-900 bg-zinc-100 shadow-sm relative z-[1]'
                title={a.name}
              />
            ))}
            {task.assignees.length > 3 && (
              <div className='w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-white dark:border-zinc-900 flex items-center justify-center text-[8px] font-black text-zinc-500 z-[0]'>
                +{task.assignees.length - 3}
              </div>
            )}
          </div>
        )}
      </div>

      <h4 className='text-[13px] font-semibold text-zinc-900 dark:text-zinc-200 mb-2.5 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
        {task.title}
      </h4>

      <div className='flex items-center justify-between mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/50'>
        <div className='flex items-center gap-2'>
          <span className='text-[10px] font-bold text-zinc-400 tabular-nums'>#{String(task.shortId || 0).padStart(3, '0')}</span>
          {task.tags && task.tags.length > 0 && (
            <div className='flex gap-1 border-l border-zinc-200 dark:border-zinc-800 pl-2'>
              {task.tags.slice(0, 2).map((tag) => (
                <div
                  key={tag.label}
                  className={`w-1.5 h-1.5 rounded-full ${tag.color.split(' ')[0]} shadow-[0_0_8px] ${tag.color.split(' ')[0].replace('bg-', 'shadow-')}/30`}
                />
              ))}
            </div>
          )}
        </div>
        <span className='text-[10px] text-zinc-400 font-bold tracking-tighter'>
          {new Date(task.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
