import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ChecklistCardProps {
  items: ChecklistItem[];
}

export function ChecklistCard({ items }: ChecklistCardProps) {
  const completedCount = items.filter(i => i.completed).length;
  const percentage = Math.round((completedCount / items.length) * 100);

  return (
    <div className='bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 relative overflow-hidden group shadow-sm'>
      {/* Background Decor */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mx-32 -my-32 transition-transform duration-700 group-hover:scale-110 pointer-events-none'></div>

      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10'>
        <div>
          <h3 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500'>
            Foco Principal
          </h3>
          <p className='text-zinc-500 text-sm mt-1'>Finalize as configurações essenciais para extrair o máximo do DeskReport.</p>
        </div>
        <div className='flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-2 pr-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 w-fit shrink-0'>
          <div className='relative w-12 h-12 flex items-center justify-center shrink-0'>
            <svg className='w-full h-full -rotate-90'>
              <circle cx='24' cy='24' r='18' className='stroke-zinc-200 dark:stroke-zinc-800' strokeWidth='4' fill='none' />
              <circle
                cx='24'
                cy='24'
                r='18'
                className='stroke-emerald-500 transition-all duration-1000 ease-out'
                strokeWidth='4'
                fill='none'
                strokeDasharray='113.1'
                strokeDashoffset={113.1 - (113.1 * percentage) / 100}
                strokeLinecap='round'
              />
            </svg>
            <span className='absolute text-[10px] font-black text-emerald-600 dark:text-emerald-400'>{percentage}%</span>
          </div>
          <div>
            <div className='text-xs font-bold text-zinc-500 tracking-wider mb-0.5 uppercase'>Progresso</div>
            <div className='text-base font-black text-zinc-900 dark:text-white'>{completedCount} de {items.length} concluídos</div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10'>
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full group/item cursor-pointer
              ${item.completed 
                ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30' 
                : 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-100 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
          >
            <div className='flex items-start justify-between mb-4'>
              <div className={`p-2 rounded-xl border ${item.completed ? 'bg-white dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-600' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
                {item.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </div>
              {!item.completed && (
                <div className='opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-500'>
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
            <div>
              <h4 className={`font-bold text-sm mb-1 ${item.completed ? 'text-emerald-900 dark:text-emerald-300' : 'text-zinc-900 dark:text-zinc-100'}`}>
                {item.title}
              </h4>
              <p className='text-xs text-zinc-500 leading-relaxed'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
