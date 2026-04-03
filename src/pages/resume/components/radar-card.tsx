import { AlertCircle, Clock, CalendarDays, ArrowUpRight } from 'lucide-react';

interface RadarCardProps {
  atRiskProjects: any[];
  delayedProjects: any[];
  upcomingTasks: any[];
  overdueCount: number;
}

export function RadarCard({ atRiskProjects, delayedProjects, upcomingTasks, overdueCount }: RadarCardProps) {
  const totalIssues = atRiskProjects.length + delayedProjects.length + overdueCount;

  return (
    <div className='bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 relative overflow-hidden group shadow-sm'>
      {/* Background Decor */}
      <div className='absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mx-32 -my-32 transition-transform duration-700 group-hover:scale-110 pointer-events-none'></div>

      <div className='flex items-center justify-between gap-6 mb-8 relative z-10'>
        <div>
          <h3 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-900 dark:from-amber-400 dark:to-zinc-100 flex items-center gap-3'>
            Radar de Operações
          </h3>
          <p className='text-zinc-500 text-sm mt-1'>Acompanhe as situações que demandam atenção imediata.</p>
        </div>
        <div className={`p-4 rounded-2xl flex items-center gap-3 bg-white dark:bg-zinc-900/50 border ${totalIssues > 0 ? 'border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
          <AlertCircle size={24} className={totalIssues > 0 ? 'animate-pulse' : ''} />
          <div className='text-2xl font-black'>{totalIssues}</div>
          <div className='text-xs font-bold leading-tight'>Alertas Ativos</div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10'>
        <div>
          <h4 className='text-xs font-black text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2'>
            <CalendarDays size={14} className='text-zinc-300' /> Projetos em Alerta ({atRiskProjects.length + delayedProjects.length})
          </h4>
          <div className='space-y-4'>
            {[...delayedProjects, ...atRiskProjects].map(p => (
              <div key={p.id} className='flex items-center p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-amber-500/30 transition-all cursor-pointer group/item'>
                <div className={`w-2 h-2 rounded-full shrink-0 mr-4 ${p.status === 'delayed' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                <div className='flex-1'>
                  <div className='text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1'>{p.name}</div>
                  <div className='text-xs text-zinc-500 font-medium capitalize mt-0.5'>{p.status.replace('_', ' ')} • {p.completion_percentage}% Concluído</div>
                </div>
                <ArrowUpRight size={16} className='text-zinc-400 opacity-0 group-hover/item:opacity-100 transition-opacity' />
              </div>
            ))}
            {atRiskProjects.length === 0 && delayedProjects.length === 0 && (
              <div className='py-6 px-12 text-center text-sm text-zinc-400 font-medium border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl flex flex-col items-center gap-2'>
                <Clock size={20} className='opacity-40' />
                Nenhum projeto em estado crítico
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className='text-xs font-black text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2'>
            <Clock size={14} className='text-zinc-300' /> Próximas Entregas Críticas ({upcomingTasks.length})
          </h4>
          <div className='grid grid-cols-2 gap-4'>
            {upcomingTasks.slice(0, 4).map(t => (
               <div key={t.id} className='p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/30 transition-all cursor-pointer group/item'>
                  <div className='text-[10px] font-black  text-blue-500 uppercase flex items-center justify-between mb-2'>
                    {new Date(t.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    <ArrowUpRight size={12} className='opacity-0 group-hover/item:opacity-100 transition-opacity' />
                  </div>
                  <div className='text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-relaxed'>{t.title}</div>
               </div>
            ))}
            {upcomingTasks.length === 0 && (
              <div className='col-span-2 py-6 px-12 text-center text-sm text-zinc-400 font-medium border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl flex flex-col items-center gap-2'>
                Tudo sob controle com as tarefas semanais
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
