import { createBrowserRouter, redirect } from 'react-router-dom';
import ChatBox from './pages/chat-box';
import MessageTemplates from './pages/automation/templates';
import AutoMessages from './pages/automation';
import BotList from './pages/automation/bot-list';
import BotBuilder from './pages/automation/bot-builder';
import App from './pages/resume';
import { Login } from './pages/auth/login';
import { Layout } from './components/layout';
import Settings from './pages/settings';
import { TaskList } from './pages/tasks/list';
import Teams from './pages/teams';
import Projects from './pages/projects';
import Notifications from './pages/notifications';
import { TaskBoards } from './pages/tasks/boards';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    loader: () => redirect('/4go'),
  },
  {
    path: '/:company_id',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: ({ params }) => redirect(`/${params.company_id}/resume`),
      },
      {
        path: 'resume',
        element: <App />,
      },
      {
        path: 'chat',
        children: [
          {
            index: true,
            loader: ({ params }) => redirect(`/${params.company_id}/chat/conversations`),
          },
          {
            path: 'conversations/:chatid?',
            element: <ChatBox />,
          },
        ]
      },
      {
        path: 'automation',
        children: [
          {
            index: true,
            loader: ({ params }) => redirect(`/${params.company_id}/automation/list`),
          },
          {
            path: 'templates',
            element: <MessageTemplates />,
          },
          {
            path: 'flow',
            element: <AutoMessages />,
          },
          {
            path: 'list',
            element: <BotList />,
          },
          {
            path: 'builder/:id?',
            element: <BotBuilder />,
          },
        ]
      },
      {
        path: 'settings/:tab?',
        element: <Settings />,
      },
      {
        path: 'teams',
        element: <Teams />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
    ],
  },
  {
    path: '/:company_id/:project_id/tasks',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: ({ params }) => redirect(`/${params.company_id}/${params.project_id}/tasks/boards`),
      },
      {
        path: 'boards',
        element: <TaskBoards />,
      },
      {
        path: 'list',
        element: <TaskList />,
      },
      // {
      //   path: ':option/:report_id',
      //   element: <Tasks />,
      // },
    ]
  },
]);
