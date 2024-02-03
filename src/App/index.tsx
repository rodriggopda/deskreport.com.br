import { useEffect, useRef, useState } from "react";
import "./index.css";
import {
  PieChart,
  Settings,
  CheckCircle,
  Bell,
  Search,
  Filter,
  MessageCircle,
  Send,
  Smile,
  Paperclip,
  ChevronUp
} from "lucide-react";

import customers from '../api/customers.json'
import { Message } from "../components/chat/message";

export default function App() {
  const inputBoxHeight = 60
  const [targetHeight, setTargetHeight] = useState(inputBoxHeight)
  const [scrollHeight, setScrollHeight] = useState(0)

  function handleApplyTargetHeight() {
    if(targetHeight === scrollHeight -inputBoxHeight) return setTargetHeight(inputBoxHeight)
    setTargetHeight(scrollHeight - inputBoxHeight)
  }

  useEffect(() => {
    if(window !== undefined) {
      const toolbar = document.querySelector('.toolbar')
      if (toolbar) setScrollHeight(window.innerHeight - toolbar.clientHeight)
    }
  } , [])

  return (
    <main className="flex min-h-screen">
      <nav className="max-h-screen flex flex-col sticky top-0 bottom-0 w-0 overflow-hidden lg:w-[16rem] border-r border-neutral-800/50">
        <div className="flex justify-between items-center p-4">
          {/* <img src="logo.svg" width={160} /> */}
          <div className='font-thin text-2xl'>Desk<span className="font-black">Report</span></div>
          <span className="text-[0.6rem] bg-purple-800 px-2 py-1 rounded-lg">
            PRO
          </span>
        </div>
        <div className="flex-1 border-t border-neutral-800/50 flex">
          <div className="flex justify-between flex-col py-4 border-r border-neutral-800/50 px-4 items-center">
            <ul className="space-y-3">
              <li className="w-10 h-10 p-2 hover:bg-neutral-700 rounded-lg">
                <PieChart strokeWidth={2} opacity={0.5} />
              </li>
              <li className="w-10 h-10 p-2 bg-neutral-900 text-indigo-400 hover:bg-neutral-700 rounded-lg">
                <MessageCircle strokeWidth={2} />
              </li>
              <li className="w-10 h-10 p-2 hover:bg-neutral-700 rounded-lg">
                <CheckCircle strokeWidth={2} opacity={0.5} />
              </li>
              <li className="w-10 h-10 p-2 hover:bg-neutral-700 rounded-lg">
                <Settings strokeWidth={2} opacity={0.5} />
              </li>
            </ul>
          </div>
          <ul className="py-4 space-y-2 w-full px-4 text-sm text-  ">
            <li className="flex items-center gap-3 py-2 px-4 text-indigo-400/100 bg-neutral-900 hover:bg-neutral-700 rounded-lg">
              <span>Todos</span>
            </li>
            <li className="flex items-center gap-3 py-2 px-4 text-white/50 hover:bg-neutral-700 rounded-lg">
              <span>Em espera</span>
            </li>
            <li className="flex items-center gap-3 py-2 px-4 text-white/50  hover:bg-neutral-700 rounded-lg">
              <span>Finalizados</span>
            </li>
            <li className="flex items-center gap-3 py-2 px-4 text-white/50 hover:bg-neutral-700 rounded-lg">
              <span>Spam</span>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex-1 max-h-screen overflow-hidden">
        <div className='toolbar'>
          <div className="py-3 border-b border-neutral-800/50 w-full flex items-center justify-between px-10">
            <h1 className="text-xl items-center">
              Central de atendimento
              {/*  - <span className='text-xs opacity-50 text-indigo-400'>Agile Report</span> */}
            </h1>
            <div className="flex gap-4 items-center">
              <button className="p-2 hover:bg-neutral-700 rounded-lg">
                <Bell size={16} strokeWidth={2} />
              </button>
              <button className="relative group hover:bg-neutral-700 rounded-full">
                <img
                  className="rounded-full bg-indigo-400"
                  width={32}
                  height={32}
                  src="https://robohash.org/rodriggopda.png?set=set5&size=126x126"
                />
              </button>
            </div>
          </div>
          <div className="px-10 py-3 border-b border-neutral-800/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                <Search className="absolute ml-3" size={16} />
                <input
                  className="bg-neutral-900 hover:bg-neutral-700 pl-10 py-2 rounded-lg text-sm outline-none ring-1 ring-transparent focus:ring-indigo-400"
                  type="text"
                  placeholder="Contatos..."
                />
              </div>
              <span className="h-2 w-px bg-neutral-100/40 mx-3 " />
            </div>
            <div className="flex items-center gap-3">
              <span className="ml-3 h-2 w-px bg-neutral-100/40" />
              <button className="flex items-center gap-1 px-3 py-2 text-sm bg-transparent  hover:bg-neutral-700 rounded-lg active:bg-neutral-900">
                <Filter className="" size={16} />
                <span>Filtros</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-2 text-sm bg-transparent hover:bg-neutral-700 rounded-lg active:bg-neutral-900">
                <Settings className="" size={16} />
                <span>Preferências</span>
              </button>
            </div>
          </div>
        </div>
        <div className='flex px-10'>
          <div className='min-w-[260px] border-r border-neutral-900'>
            <ul style={{ height: scrollHeight + 'px' }} className="overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 py-4 space-y-2 w-full text-sm">
              {customers.data.map((customer) => (
                <li key={customer.id} className="max-w-[260px] flex items-center gap-3 py-2 px-4 hover:bg-neutral-700 rounded-lg">
                  <img
                    className="rounded-full bg-indigo-400"
                    width={32}
                    height={32}
                    src={customer.avatar}
                  />
                  <span className="truncate">{customer.first_name + ' ' + customer.last_name }</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 ml-10 -mr-10">
            <div style={{ height: scrollHeight + 'px' }}  className="overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 w-full rounded-t-lg rounded-b-lg overflow-hidden pb-32 pr-10">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse().map((item) => (
                  <Message key={item} />
                ))}
            </div>
            <div style={{ height: targetHeight }} className="transition-all flex flex-col sticky rounded-t-2xl bottom-4 bg-neutral-900 pt-1 px-5 pb-4 mr-12">
              <button onClick={handleApplyTargetHeight} draggable className='mx-auto opacity-50 hover:opacity-100 rounded-full hover:bg-neutral-800 px-10 mb-1'>
                <ChevronUp size={12} />
              </button>
              <div className="flex-1 p-3 flex items-start rounded-lg bg-neutral-800 w-full">
                <textarea className='resize-none w-full h-10 bg-transparent outline-none pl-5 py-2' placeholder="Mensagem..." />
                <button className="bg-transparent rounded-full p-2.5 opacity-50 hover:opacity-100 hover:bg-neutral-700">
                  <Smile size={20} />
                </button>
                <button className="mx-1 bg-transparent rounded-full p-2.5 opacity-50 hover:opacity-100 hover:bg-neutral-700">
                  <Paperclip size={20} />
                </button>
                <button className="bg-indigo-600 rounded-full p-2.5 hover:bg-indigo-500">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
