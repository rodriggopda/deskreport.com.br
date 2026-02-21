import React from 'react';
import { CheckCircle, MessageCircle, PieChart, Settings, Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { SubmenuItem } from '../../store';
import { Notification } from './notification';

export function Navbar() {

  return (
    <div className="py-2 pl-2 h-screen max-h-screen">
      <nav className="h-full flex flex-col w-[88px] overflow-hidden bg-slate-900 dark:bg-black rounded-2xl z-50 transition-colors shadow-xl border border-white/5 shadow-black/20">
        <div className='flex justify-center items-center py-6'>
          <img className='h-8' src="/white-simbolo.svg" alt="DeskReport logo" />
        </div>
        <div className='flex-1 flex'>
          <div className='flex flex-col py-2 w-full'>
            <ul className='space-y-3 w-full px-3'>
              <MenuNavLink to='/' icon={<PieChart size={22} strokeWidth={2} />} label='Início' />
              <MenuNavLink to='/chat' icon={<MessageCircle size={22} strokeWidth={2} />} label='Conversas' />
              <MenuNavLink to='/reports' icon={<CheckCircle size={22} strokeWidth={2} />} label='Serviços' />
              <MenuNavLink to='/settings' icon={<Settings size={22} strokeWidth={2} />} label='Config...' />
            </ul>
          </div>
        </div>
        <div className='mt-auto p-4 pb-6 flex flex-col items-center gap-6'>
          <button className='group relative p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors'>
            <Bell size={22} strokeWidth={2} />
            <Notification />
          </button>
          <button className='w-10 h-10 rounded-full overflow-hidden border border-white/20 hover:border-white transition-colors shadow-sm'>
            <img src='https://robohash.org/rodriggopda.png?set=set5&size=126x126' alt='Avatar' className='w-full h-full object-cover bg-white/10' />
          </button>
        </div>
      </nav>
    </div>
  );
}

export function MenuNavLink({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <li>
      <NavLink to={to} className={({ isActive }) => [isActive ? 'text-white font-bold' : 'text-slate-400 font-medium hover:text-slate-200', ' group flex flex-col items-center justify-center gap-1.5 transition-all duration-200'].join('')}>
        {({ isActive }) => (
          <>
            <div className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'bg-transparent text-slate-400 group-hover:bg-white/10 group-hover:text-white'}`}>
              {icon}
            </div>
            <span className='text-[10px] tracking-wide'>{label}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

export function SubNavLink({ name, to }: SubmenuItem) {
  return <NavLink to={to} className={({ isActive }) => [isActive ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 shadow-sm font-semibold border border-neutral-200 dark:border-transparent' : 'text-neutral-500 border border-transparent', ' flex items-center gap-3 pt-1 pb-1.5 px-4 rounded-lg transition-colors'].join('')}>
    <span>{name}</span>
  </NavLink>
}