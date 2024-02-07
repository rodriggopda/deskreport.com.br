import { Bell, Check, MessageCircle, UserPlus } from 'lucide-react';
import { Toolbar } from './toolbar';

type TopbarProps = {
  title?: string;
  toolbarOptions?: React.ReactNode;
  children?: React.ReactNode;
};

export function Topbar({ title, children, toolbarOptions }: TopbarProps) {
  return (
    <div className='toolbar'>
      <div className='py-3 border-b border-neutral-800/50 w-full flex items-center justify-between px-10'>
        <h1 className='text-xl items-center'>
          {title}
          {/*  - <span className='text-xs opacity-50 text-indigo-400'>Agile Report</span> */}
        </h1>
        <div className='flex gap-4 items-center'>
          <button className='group relative p-2 hover:bg-neutral-700 focus:bg-neutral-900 rounded-lg'>
            <Bell size={16} strokeWidth={2} />
            <div className='z-50 drop-shadow-xl absolute border border-neutral-800/40 overflow-hidden rounded-lg w-0 group-focus:min-w-[320px] right-0 top-9'>
              <div className='text-left group-focus:p-4 bg-neutral-900 h-0 group-focus:h-[400px] overflow-y-auto scrollbar-thin'>
                <div>
                  <span className='text-xl'>Notificações </span>
                  <span className=''>(10)</span>
                </div>
                <ul className='mt-4 text-xs'>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <li className='py-3 flex items-start relative' key={item}>
                      <span className='z-10 left-4 h-full absolute flex border-r border-neutral-800' />
                      <div className='relative z-20 rounded-full bg-neutral-700 p-2 mr-3'>
                        <MessageCircle size={18} />
                      </div>
                      <div>
                        <p className='mb-2'>
                          <span className='font-bold'>Rodrigo Andrade </span>
                          comentou na tarefa que você criou
                        </p>
                        <span className='text-indigo-600'>há 2 horas</span>
                      </div>
                      <button className='ml-3 text-neutral-700'>
                        <Check size={16} />
                      </button>
                    </li>
                  ))}

                  <li className='py-3 flex items-start relative'>
                    <div className='relative z-20 rounded-full bg-neutral-700 p-2 mr-3'>
                      <UserPlus size={18} />
                    </div>
                    <div>
                      <p className='mb-2'>
                        <span className='font-bold'>Rodrigo Andrade </span>
                        adicionou você no DeskReport
                      </p>
                      <span className='text-indigo-600'>há 2 meses</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </button>
          <button className='relative group hover:bg-neutral-700 rounded-full'>
            <img className='rounded-full bg-indigo-400' width={32} height={32} src='https://robohash.org/rodriggopda.png?set=set5&size=126x126' />
          </button>
        </div>
      </div>
      <Toolbar toolbarOptions={toolbarOptions}>{children}</Toolbar>
    </div>
  );
}
