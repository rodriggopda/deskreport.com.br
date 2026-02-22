import React from 'react';
import { CheckCircle, MessageCircle, PieChart, Settings, Bell, Users, FolderDot, Zap } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';
import { SubmenuItem } from '../../store';

export function Navbar() {
  const { company_id, project_id } = useParams();
  const cId = company_id || '4go';
  const pId = project_id || 'deskreport';

  return (
    <div className="h-screen max-h-screen">
      <nav className="h-full flex flex-col w-[74px] overflow-hidden bg-slate-900 dark:bg-neutral-900 z-50 transition-colors shadow-xl border-r border-white/5 dark:border-neutral-800 shadow-black/20">
        <div className='flex justify-center items-center py-6'>
          <img className='h-8' src="/white-simbolo.svg" alt="DeskReport logo" />
        </div>
        <div className='flex-1 flex'>
          <div className='flex flex-col py-2 w-full'>
            <ul className='space-y-3 w-full px-2'>
              <MenuNavLink to={`/${cId}/resume`} icon={<PieChart size={22} strokeWidth={2} />} label='Início' />
              <MenuNavLink to={`/${cId}/chat`} icon={<MessageCircle size={22} strokeWidth={2} />} label='Conversas' />
              <MenuNavLink to={`/${cId}/automation`} icon={<Zap size={22} strokeWidth={2} />} label='Automação' />
              <MenuNavLink to={`/${cId}/teams`} icon={<Users size={22} strokeWidth={2} />} label='Equipes' />
              <MenuNavLink to={`/${cId}/projects`} icon={<FolderDot size={22} strokeWidth={2} />} label='Projetos' />
              <MenuNavLink to={`/${cId}/${pId}/tasks`} icon={<CheckCircle size={22} strokeWidth={2} />} label='Tarefas' />
              <MenuNavLink to={`/${cId}/notifications`} icon={<Bell size={22} strokeWidth={2} />} label='Avisos' />
              <MenuNavLink to={`/${cId}/settings`} icon={<Settings size={22} strokeWidth={2} />} label='Configs' />
            </ul>
          </div>
        </div>
        <div className='mt-auto p-2 pb-6 flex flex-col items-center gap-6'>
          <button className='w-10 h-10 rounded-lg overflow-hidden border border-white/20 hover:border-white transition-colors shadow-sm'>
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
            <div className={`p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'bg-transparent text-slate-400 group-hover:bg-white/10 group-hover:text-white'}`}>
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
  return <NavLink to={to} className={({ isActive }) => [isActive ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 font-semibold border-neutral-200' : 'text-neutral-500', ' flex items-center gap-3 py-1 px-4 rounded transition-colors'].join('')}>
    <span>{name}</span>
  </NavLink>
}