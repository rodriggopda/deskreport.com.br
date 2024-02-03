import {
  createBrowserRouter
} from 'react-router-dom'
import ChatBox from './pages/chat-box'
import App from './pages'


export const router = createBrowserRouter([
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