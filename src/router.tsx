import {
  createBrowserRouter
} from 'react-router-dom'
import ChatBox from './app/chat-box'


export const router = createBrowserRouter([
  {
    path: '/',
  },
  {
    path: '/chat/all/:chatid',
    element: <ChatBox />
  }
])