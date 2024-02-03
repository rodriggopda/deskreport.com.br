import {
  createBrowserRouter
} from 'react-router-dom'
import ChatBox from './pages/chat-box'
import App from './pages'
import { Login } from './pages/auth/login'


export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <App />
  },
  {
    path: '/chat/:option',
    element: <ChatBox />
  },
  {
    path: '/chat/:option/:chatid',
    element: <ChatBox />
  }
])