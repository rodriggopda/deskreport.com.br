import { createBrowserRouter, redirect } from 'react-router-dom';
import ChatBox from './pages/chat-box';
import MessageTemplates from './pages/chat-box/views/templates';
import AutoMessages from './pages/chat-box/views/automation';
import BotBuilder from './pages/chat-box/views/bot-builder';
import App from './pages/resume';
import { Login } from './pages/auth/login';
import { Layout } from './components/layout';
import Settings from './pages/settings';
import { Tasks } from './pages/tasks';
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
        path: '/tasks',
        loader: () => redirect('/tasks/all'),
      },
      {
        path: '/tasks/:option',
        element: <Tasks />,
      },
      {
        path: '/tasks/:option/:report_id',
        element: <Tasks />,
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
