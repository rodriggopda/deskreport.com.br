import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { InternalChatSidebar } from './internal-chat-sidebar';
import { useEffect } from 'react';

export function Layout() {
  useEffect(() => {
    if (window) {
      Notification.requestPermission().then((result) => {
        console.log('Notifications', result);
      });
    }
  }, []);

  return (
    <main className='flex min-h-screen overflow-hidden'>
      <Navbar />
      <div className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </div>
      <InternalChatSidebar />
    </main>
  );
}
