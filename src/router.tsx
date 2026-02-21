import { createBrowserRouter, redirect } from 'react-router-dom';
import ChatBox from './pages/chat-box';
import MessageTemplates from './pages/chat-box/views/templates';
import AutoMessages from './pages/chat-box/views/automation';
import BotBuilder from './pages/chat-box/views/bot-builder';
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
        loader: () => redirect('/chat/conversations'),
      },
      {
        path: '/chat/conversations/:chatid?',
        element: <ChatBox />,
      },
      {
        path: '/chat/templates',
        element: <MessageTemplates />,
      },
      {
        path: '/chat/automation',
        element: <AutoMessages />,
      },
      {
        path: '/chat/builder',
        element: <BotBuilder />,
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
