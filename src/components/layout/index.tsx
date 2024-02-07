import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';

export function Layout() {
  return (
    <main className='flex min-h-screen'>
      <Navbar />
      <Outlet />
    </main>
  );
}
