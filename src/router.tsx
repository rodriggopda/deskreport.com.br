import { createBrowserRouter, redirect } from 'react-router-dom';
import ChatBox from './pages/chat-box';
import App from './pages/resume';
import { Login } from './pages/auth/login';
import { Layout } from './components/layout';
import Settings from './pages/settings';
import { Reports } from './pages/reports';
import Teams from './pages/teams';
import Projects from './pages/projects';
import Notifications from './pages/notifications';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/chat',
        loader: () => redirect('/chat/all'),
      },
      {
        path: '/chat/:option',
        element: <ChatBox />,
      },
      {
        path: '/chat/:option/:chatid',
        element: <ChatBox />,
      },
      {
        path: '/reports',
        loader: () => redirect('/reports/all'),
      },
      {
        path: '/reports/:option',
        element: <Reports />,
      },
      {
        path: '/reports/:option/:report_id',
        element: <Reports />,
      },
      {
        path: '/settings/:tab?',
        element: <Settings />,
      },
      {
        path: '/teams',
        element: <Teams />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
      },
    ],
  },
]);
