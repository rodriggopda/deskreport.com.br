import { ChevronUp, ChevronsUp, Minus, Search, Settings } from 'lucide-react';
import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import { useEffect, useState } from 'react';

import customers from '../../api/customers.json';
import { NavLink, useParams } from 'react-router-dom';

export default function Tasks() {
  const inputBoxHeight = 100;
  const [targetHeight, setTargetHeight] = useState(inputBoxHeight);
  const [scrollHeight, setScrollHeight] = useState(0);

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
    { title: 'Em análise', flagColor: '#6e7681' },
    { title: 'Em andamento', flagColor: '#1f6feb' },
    { title: 'Aguardando revisão', flagColor: '#bd561d' },
    { title: 'Finalizadas', flagColor: '#238636' }
  ]

  return (
    <Page navigation={navigation}>
      <Topbar title='Demandas'>
        <span className='text-xs'>Há um total de 18 tarefas</span>
      </Topbar>
      <div className='flex px-10'>
        {boards.map((board) => <div key={board.title} className='min-w-[320px] mr-4 border-r border-neutral-900'>
          <div
            style={{ height: scrollHeight + 'px' }}
            className='relative overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 pb-4 space-y-3 w-full text-sm'
          >
            <div className='py-2 flex items-center bg-neutral-950 sticky top-0 -mb-3'>
              <span style={{ borderColor: board.flagColor }} className='ml-2 mr-3 w-3 h-3 flex rounded-full border-2' />
              <span>{board.title}</span>
            </div>
            {customers.data.map((customer, index) => Math.round(Math.random() * 20) == index && (
              <NavLink
                draggable
                to={'/tasks/' + activeOption + '/' + customer.id}
                key={customer.id}
                className={`${activeChatId === customer.id.toString() ? 'bg-neutral-900 text-indigo-500' : 'bg-neutral-900 border-neutral-800/50'
                  } max-w-[320px] flex items-center gap-3 py-2 px-4 hover:bg-neutral-800/75 rounded-lg border`}
              >
                <div className='flex flex-col w-full'>
                  <div className='flex-1 flex justify-between'>
                    <span className='text-xs text-neutral-500'>Demanda #{customer.id}</span>
                    <span className='text-xs'>
                      {index == Math.round(Math.random() * 20) && <ChevronsUp size={16} color='#ca1212' />}
                      {index == Math.round(Math.random() * 20) && <ChevronUp size={16} color='#bd561d' />}
                      {index == Math.round(Math.random() * 20) && <Minus size={16} color='#1f6feb' />}
                    </span>
                  </div>
                  <p className='my-3 text-sm break-words'>{customer.address.street_address} {customer.email} {customer.employment.key_skill}</p>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-neutral-500'>Vencimento: 20/04/2024</span>

                    {board.title == 'Finalizadas' ? <span className='text-xs text-white bg-green-600 px-2 rounded'>Finalizada</span> : <span className='text-xs text-neutral-300 bg-neutral-700 px-2 rounded'>Pendente</span>}
                  </div>
                  <div className='mt-5 flex border-t border-neutral-800 items-center flex-1 justify-between pt-2.5 pb-0.5'>
                    <div className='flex items-center gap-2'>
                      <img className='rounded-full bg-indigo-400' width={16} height={16} src={customer.avatar} />
                      <span className='truncate text-xs'>{customer.first_name + ' ' + customer.last_name}</span>
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
