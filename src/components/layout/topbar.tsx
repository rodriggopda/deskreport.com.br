import { Bell } from 'lucide-react';
import { Toolbar } from './toolbar';
import { Notification } from './notification';

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
            <Notification />
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
