import { createBrowserRouter, redirect } from 'react-router-dom';
import ChatBox from './pages/chat-box';
import App from './pages/resume';
import { Login } from './pages/auth/login';
import { Layout } from './components/layout';
import Settings from './pages/settings';
import Tasks from './pages/tasks';

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
        path: '/tasks',
        loader: () => redirect('/tasks/all'),
      },
      {
        path: '/tasks/:option',
        element: <Tasks />,
      },
      {
        path: '/tasks/:option/:taskid',
        element: <Tasks />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);
