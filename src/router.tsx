import {
  createBrowserRouter
} from 'react-router-dom'
import ChatBox from './app/chat-box'
import App from './app'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/chat/all/:chatid',
    element: <ChatBox />
  }
])