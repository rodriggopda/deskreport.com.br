import { Bell } from 'lucide-react';
import { Toolbar } from './toolbar';
import { Notification } from './notification';

type TopbarProps = {
  title?: string;
  toolbarOptions?: React.ReactNode;
  children?: React.ReactNode;
  inputSearch?: 'on' | 'off';
};

export function Topbar({ title, children, toolbarOptions, inputSearch }: TopbarProps) {
  return (
    <div className='toolbar'>
      <div className='py-3 border-b border-neutral-800/50 w-full flex items-center justify-between px-10'>
        <div className='flex items-center gap-3'>
          <div className='flex justify-between items-center p-4'>
            {/* <img src="logo.svg" width={160} /> */}
            <div className='font-thin text-2xl'>
              Desk<span className='font-black'>Report</span>
            </div>
            <span className='ml-3 text-[0.6rem] bg-purple-800 px-2 py-1 rounded-lg'>PRO</span>
          </div>
          <h1 className='text-xl items-center'>
            {title}
            {/*  - <span className='text-xs opacity-50 text-indigo-400'>Agile Report</span> */}
          </h1>
        </div>
        <div className='flex gap-4 items-center'>
          <button className='group relative p-2 hover:bg-neutral-700 focus:bg-neutral-900 rounded-lg'>
            <Bell size={16} strokeWidth={2} />
            <Notification />
          </button>
          <button className='relative group hover:bg-neutral-700 rounded-full'>
            <img className='rounded-full bg-indigo-400' width={32} height={32} src='https://robohash.org/rodriggopda.png?set=set5&size=126x126' />
          </button>
        </div>
      </div>
      {children ? (
        <Toolbar inputSearch={inputSearch} toolbarOptions={toolbarOptions}>
          {children}
        </Toolbar>
      ) : null}
    </div>
  );
}
