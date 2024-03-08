import { ChevronUp, ChevronsUp, Minus, Search, Settings } from 'lucide-react';
import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import React, { useEffect, useState } from 'react';

import tasksData from '../../api/tasks.json';
import { NavLink, useParams } from 'react-router-dom';

export default function Tasks() {
  const inputBoxHeight = 100;
  const [targetHeight, setTargetHeight] = useState(inputBoxHeight);
  const [scrollHeight, setScrollHeight] = useState(0);

  const [tasks, setTasks] = useState([...tasksData.data])
  const [targetBoard, setTargetBoard] = useState<string | undefined>('')

  const navigation = [
    { name: 'Todas', to: '/tasks/all' },
    { name: 'Em andamento', to: '/tasks/in-progress' },
    { name: 'Vencidas', to: '/tasks/over' },
    { name: 'Finalizadas', to: '/tasks/finalized' },
  ]

  const params = useParams();
  const activeChatId = params['chatid'];
  const activeOption = params['option'];

  useEffect(() => {
    if (window !== undefined) {
      navigator.requestMediaKeySystemAccess
      window.addEventListener('resize', () => {
        setScrollHeightOnLoad(window.innerHeight);
        return;
      });
      setScrollHeightOnLoad(window.innerHeight);
    }
  }, []);

  function setScrollHeightOnLoad(windowSize: number) {
    const toolbar = document.querySelector('.toolbar');
    if (toolbar) setScrollHeight(windowSize - toolbar.clientHeight);
    window.removeEventListener('resize', () => { });
  }

  function handleApplyTargetHeight() {
    if (targetHeight === scrollHeight - inputBoxHeight) return setTargetHeight(inputBoxHeight);
    setTargetHeight(scrollHeight - inputBoxHeight);
  }

  const boards = [
    { title: 'Em análise', flagColor: '#6e7681', data: 'under-analysis' },
    { title: 'Em andamento', flagColor: '#1f6feb', data: 'in-progress' },
    { title: 'Aguardando revisão', flagColor: '#bd561d', data: 'awaiting-review' },
    { title: 'Finalizadas', flagColor: '#238636', data: 'finished' }
  ]

  /* function dragStart(e: React.DragEvent) {
    console.dir(e.target)
  } */

  return (
    <Page navigation={navigation}>
      <Topbar title='Demandas'>
        <span className='text-xs'>Há um total de 18 tarefas</span>
      </Topbar>
      <div className='flex'>
        {boards.map((board) => <div key={board.title} className='min-w-max'>
          <div
            data-board={board.data}
            onDragOver={(e) => {
              setTargetBoard(e.currentTarget.attributes.getNamedItem('data-board')?.value)
              e.currentTarget.classList.add('bg-neutral-900/50')
              e.currentTarget.childNodes.forEach((node: any) => {
                node.classList.add('pointer-events-none')
              })
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('bg-neutral-900/50')
              e.currentTarget.childNodes.forEach((node: any) => {
                node.classList.remove('pointer-events-none')
              })
            }}
            style={{ height: scrollHeight + 'px' }}
            className='border-r border-neutral-900 px-4 w-80 relative overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 pb-4 space-y-4 text-sm'
          >
            <div className='py-2 flex items-center bg-neutral-950 sticky top-0 border-b border-neutral-900 -mx-10 px-10'>
              <span style={{ borderColor: board.flagColor }} className='ml-2 mr-3 w-3 h-3 flex rounded-full border-2' />
              <span>{board.title}</span>
            </div>
            {tasks.map((task: any, index: number) => task.status === board.data && (
              <NavLink
                data-task={task.id}
                draggable
                onDragOver={(e) => {
                  console.log(e.currentTarget)
                  e.currentTarget.style.marginTop = '150px'
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.marginTop = '16px'
                }}
                onDragStart={(card) => {
                  const size = card.currentTarget.clientWidth + 2
                  card.currentTarget.classList.add('opacity-30')
                  card.currentTarget.style.maxWidth = `${size}px`
                  console.dir(card.currentTarget)
                }}
                onDragEnd={(e) => {
                  e.currentTarget.style.maxWidth = `100%`
                  e.currentTarget.classList.remove('absolute', 'opacity-30')

                  const taskId = e.currentTarget.attributes.getNamedItem('data-task')?.value
                  setTasks([...tasks].map((ts) => {
                    if (ts.id == taskId && targetBoard) {
                      ts.status = targetBoard
                    }
                    return ts
                  }))
                }}
                to={'/tasks/' + activeOption + '/' + task.id}
                key={task.id}
                className={`${activeChatId === task.id.toString() ? 'bg-neutral-900 text-indigo-500' : 'bg-neutral-900 border-neutral-800/50'
                  } w-full flex items-center gap-3 py-2 px-4 hover:bg-neutral-800/75 rounded-lg border`}
              >
                <div className='flex flex-col w-full'>
                  <div className='flex-1 flex justify-between'>
                    <span className='text-xs text-neutral-500'>Demanda #{task.id}</span>
                    {/* <span className='text-xs'>
                      {index == Math.round(Math.random() * 20) && <ChevronsUp size={16} color='#ca1212' />}
                      {index == Math.round(Math.random() * 20) && <ChevronUp size={16} color='#bd561d' />}
                      {index == Math.round(Math.random() * 20) && <Minus size={16} color='#1f6feb' />}
                    </span> */}
                  </div>
                  <p className='my-3 text-sm break-words'>{task.title}</p>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-neutral-500'>Vencimento: {task.dueDate}</span>
                    {board.data == task.status && <span className='text-xs text-white px-2 rounded' style={{ background: board.flagColor }}>{task.status}</span>}
                  </div>
                  <div className='mt-5 flex border-t border-neutral-800 items-center flex-1 justify-between pt-2.5 pb-0.5'>
                    <div className='flex items-center gap-2'>
                      <img className='rounded-full bg-indigo-400' width={16} height={16} src={`https://robohash.org/${task.signee.replace(' ', '').toLocaleLowerCase}.png?size=300x300\u0026set=set1`} />
                      <span className='truncate text-xs'>{task.signee}</span>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>)}

      </div>
    </Page>
  );
}
