import { CheckCircle, MessageCircle, PieChart, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className='max-h-screen flex flex-col sticky top-0 bottom-0 w-0 overflow-hidden lg:w-[16rem] border-r border-neutral-800/50'>
      <div className='flex justify-between items-center p-4'>
        {/* <img src="logo.svg" width={160} /> */}
        <div className='font-thin text-2xl'>
          Desk<span className='font-black'>Report</span>
        </div>
        <span className='text-[0.6rem] bg-purple-800 px-2 py-1 rounded-lg'>PRO</span>
      </div>
      <div className='flex-1 border-t border-neutral-800/50 flex'>
        <div className='flex justify-between flex-col py-4 border-r border-neutral-800/50 px-4 items-center'>
          <ul className='space-y-3'>
            <li className='w-10 h-10 p-2 hover:bg-neutral-700 rounded-lg'>
              <PieChart strokeWidth={2} opacity={0.5} />
            </li>
            <li className='w-10 h-10 p-2 bg-neutral-900 text-indigo-400 hover:bg-neutral-700 rounded-lg'>
              <MessageCircle strokeWidth={2} />
            </li>
            <li className='w-10 h-10 p-2 hover:bg-neutral-700 rounded-lg'>
              <CheckCircle strokeWidth={2} opacity={0.5} />
            </li>
            <li className='w-10 h-10 p-2 hover:bg-neutral-700 rounded-lg'>
              <Settings strokeWidth={2} opacity={0.5} />
            </li>
          </ul>
        </div>
        <div className='py-4 space-y-2 w-full px-4 text-sm text-  '>
          <NavLink to={'/chat/all'} className='flex items-center gap-3 py-2 px-4 text-indigo-400/100 bg-neutral-900 hover:bg-neutral-700 rounded-lg'>
            <span>Todos</span>
          </NavLink>
          <NavLink to={'/chat/await'} className='flex items-center gap-3 py-2 px-4 text-white/50 hover:bg-neutral-700 rounded-lg'>
            <span>Em espera</span>
          </NavLink>
          <NavLink to={'/chat/finalized'} className='flex items-center gap-3 py-2 px-4 text-white/50  hover:bg-neutral-700 rounded-lg'>
            <span>Finalizados</span>
          </NavLink>
          <NavLink to={'/chat/spam'} className='flex items-center gap-3 py-2 px-4 text-white/50 hover:bg-neutral-700 rounded-lg'>
            <span>Spam</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
