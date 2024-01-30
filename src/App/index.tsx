import "./index.css";
import {
  PieChart,
  Settings,
  CheckCircle,
  Bell,
  UserPlus2,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  Zap,
} from "lucide-react";

export default function App() {
  return (
    <main className="flex min-h-screen">
      <nav className="max-h-screen flex flex-col sticky top-0 bottom-0 w-0 overflow-hidden lg:w-[16rem] border-r border-neutral-800/50">
        <div className="flex justify-between items-center p-4">
          <img src="logo.svg" width={160} />
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
            <li className="flex items-center gap-3 py-2 px-4 text-white/50 hover:bg-neutral-700 rounded-lg">
              <img
                className="rounded-full bg-indigo-400"
                width={32}
                height={32}
                src="https://robohash.org/rodrigo.png?set=set5&size=126x126"
              />
              <span>Rodrigo</span>
            </li>
            <li className="flex items-center gap-3 py-2 px-4 text-indigo-400/100 bg-neutral-900 hover:bg-neutral-700 rounded-lg">
              <img
                className="rounded-full bg-indigo-400"
                width={32}
                height={32}
                src="https://robohash.org/joana.png?set=set5&size=126x126"
              />
              <span>Joana</span>
            </li>
            <li className="flex items-center gap-3 py-2 px-4 text-white/50  hover:bg-neutral-700 rounded-lg">
              <img
                className="rounded-full bg-indigo-400"
                width={32}
                height={32}
                src="https://robohash.org/maicon.png?set=set5&size=126x126"
              />
              <span>Maicon</span>
            </li>
            <li className="flex items-center gap-3 py-2 px-4 text-white/50 hover:bg-neutral-700 rounded-lg">
              <img
                className="rounded-full bg-indigo-400"
                width={32}
                height={32}
                src="https://robohash.org/julio.png?set=set5&size=126x126"
              />
              <span>Julio</span>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex-1">
        {/* <div className=''>
            <div>
              <h3 className='text-xl'>Sprint 1</h3>
              <p className='text-sm opacity-50'>This sprint objective is create and delivery a feature to best scrum app</p>
            </div>
            <div className='mt-5 flex items-center -space-x-2'>
              {
                [1,2,3,4,5,6].map((item) => (
                  <img className={`rounded-full ${item === 1 ? 'bg-indigo-400' : 'bg-purple-800'} transition-transform hover:scale-110 border-2 border-neutral-950 w-8 h-8 mr-3`} width={32} height={32} src={`https://robohash.org/${item}.png?set=set5&size=126x126`} />
                ))
              }
              <button className='hover:bg-neutral-700 bg-neutral-900 p-1.5 rounded-full'>
                <UserPlus2 size={20} />
              </button>
            </div>
          </div> */}
        <div className="py-3 border-b border-neutral-800/50 w-fullm flex items-center justify-between px-10">
          <h1 className="text-xl items-center">Joana Marques - <span className='text-xs opacity-50 text-indigo-400'>Agile Report</span></h1>
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
                placeholder="Pesquise na conversa"
              />
            </div>
            <span className="h-2 w-px bg-neutral-100/40 mx-3 " />
            {/* <div className="flex items-center gap-2">
              <span className="text-sm">Equipe:</span>
              <div className="flex items-center -space-x-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <img
                    className={`rounded-full ${
                      item === 1 ? "bg-indigo-400" : "bg-purple-800"
                    } transition-transform hover:scale-110 border-2 border-neutral-950 w-8 h-8 mr-3`}
                    width={32}
                    height={32}
                    src={`https://robohash.org/${item}.png?set=set5&size=126x126`}
                  />
                ))}
                <button className="hover:bg-neutral-700 bg-neutral-900 p-1.5 rounded-full">
                  <UserPlus2 size={20} />
                </button>
              </div>
            </div> */}
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
            {/* <button className='p-3 bg-neutral-900 hover:bg-neutral-700 rounded-lg active:outline-indigo-400'>
              <Kanban className='' size={16} />
            </button> */}
          </div>
        </div>
        <div className="pt-5 flex flex-col space-y-5 mx-10 pb-20">
          {/* <span className="text-xs opacity-50">2 sprints - 10 itens</span> */}

          <div className="w-full rounded-t-lg rounded-b-lg overflow-hidden">
            
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse().map((item) => (
                <div
                  key={item}
                  className="border-t border-neutral-800/50 select-none bg-neutral-900/50 hover:bg-neutral-900 group"
                >
                  <td className="pl-4">
                    <div>
                      <div className="transition-all opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 relative w-4 h-4 bg-neutral-900 rounded group-hover:bg-neutral-700">
                        <span></span>
                        <input type="checkbox" hidden />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-left">
                    <p>Main Topic of Subject</p>
                  </td>
                  <td className="text-center">5/10</td>
                  <td className="">
                    <div className="flex w-max items-center gap-2 mx-auto">
                      <div className="bg-indigo-400/20 w-20">
                        <span className="block w-10 h-1 bg-indigo-400" />
                      </div>
                      <span className="text-xs">50%</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <img
                      src={`https://robohash.org/${item}.png?set=set5&size=126x126`}
                      className="mx-auto rounded-full bg-purple-800 w-8 h-8"
                      width={32}
                      height={32}
                    />
                  </td>
                  <td className="text-right pr-4 text-sm">26/01/2024</td>
                </div>
              ))}

          </div>
        </div>
      </div>
    </main>
  );
}
