import { createBrowserRouter } from 'react-router-dom';
import ChatBox from './pages/chat-box';
import App from './pages';
import { Login } from './pages/auth/login';
import { Layout } from './components/layout';

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
        path: '/chat/:option',
        element: <ChatBox />,
      },
      {
        path: '/chat/:option/:chatid',
        element: <ChatBox />,
      },
    ],
  },
]);
