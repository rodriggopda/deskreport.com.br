import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import { useParams } from 'react-router-dom';
import { Plus, MoreHorizontal } from 'lucide-react';

type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done' | 'release';

export type TaskCardProps = {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  assignee?: {
    name: string;
    avatar: string;
  };
  tags?: { label: string; color: string }[];
}

const MOCK_TASKS: TaskCardProps[] = [
  { id: '101', title: 'Permissões e Perfis', project: 'oneteam', status: 'in-progress', tags: [{ label: 'Feature', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }, { label: 'Módulo Ticket', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' }, { label: 'Módulo WhatsApp', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' }] },
  { id: '286', title: 'Adicionar alerta de tamanho de arquivo no ticket', project: 'oneteam', status: 'release', assignee: { name: 'rodriggopda', avatar: 'https://github.com/rodriggopda.png' }, tags: [{ label: 'Melhoria', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }] },
  { id: '318', title: 'Pesquisa de satisfação', project: 'oneteam', status: 'todo', tags: [{ label: 'Feature', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }] },
  { id: '317', title: 'Adicionar campo de observação nos parametros de pesquisa de conversas', project: 'oneteam', status: 'review', tags: [{ label: 'Melhoria', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }] },
  { id: '301', title: 'Pesquisa não está encontrando dados quando está em "Minhas Conversas"', project: 'oneteam', status: 'done', assignee: { name: 'rodriggopda', avatar: 'https://github.com/rodriggopda.png' }, tags: [{ label: 'Bug', color: 'bg-red-500/10 text-red-500 border-red-500/20' }] },
  { id: '309', title: 'SLA de Whatsapp não está funcionando', project: 'oneteam', status: 'done', tags: [{ label: 'Bug', color: 'bg-red-500/10 text-red-500 border-red-500/20' }] },
  { id: '314', title: 'Cadastro de usuário via email', project: 'oneteam', status: 'todo' },
  { id: '310', title: 'Inserir filtro tela SLA', project: 'oneteam', status: 'done' },
  { id: '311', title: 'Workspace não está ficando setado ao editar usuário', project: 'oneteam', status: 'done' },
  { id: '312', title: 'Usuários não admin não consegue fazer alteração da própria senha', project: 'oneteam', status: 'done' },
  { id: '296', title: 'Criação e aplicação do SLA', project: 'oneteam', status: 'done' },
  { id: '308', title: 'SLA Tickets - tempo não está aplicando corretamente', project: 'oneteam', status: 'done' },
  { id: '306', title: 'Chat interno', project: 'oneteam', status: 'backlog' }
];

export function TaskBoards() {
  const { company_id, project_id } = useParams();
  const cId = company_id || '4go';
  const pId = project_id || 'deskreport';

  const navigation = [
    { name: 'Quadros', to: `/${cId}/${pId}/tasks/boards` },
    { name: 'Em Lista', to: `/${cId}/${pId}/tasks/list` },
  ]

  const columns = [
    { id: 'backlog', title: 'Backlog', description: 'Funcionalidades, melhorias e correções aguardando aprovação.', color: 'text-zinc-500' },
    { id: 'todo', title: 'Para fazer', description: 'Tarefas já especificadas e prontas para serem iniciadas.', color: 'text-zinc-100' },
    { id: 'in-progress', title: 'Em andamento', description: 'Funcionalidades em desenvolvimento.', color: 'text-blue-500' },
    { id: 'review', title: 'Revisão', description: 'Tarefas em fase de validação ou revisão de código.', color: 'text-purple-500' },
    { id: 'release', title: 'Release', description: 'Pronto para entrar em produção.', color: 'text-emerald-500' },
    { id: 'done', title: 'Concluído', description: 'Finalizadas e validadas.', color: 'text-zinc-500' }
  ];

  return (
    <Page navigation={navigation}>
      <Topbar title='Tarefas' smartHeader>
        <div className='flex items-center gap-4 text-xs font-medium text-zinc-500'>
          <span>Total: {MOCK_TASKS.length} tarefas</span>
          <div className='w-px h-3 bg-zinc-200 dark:bg-zinc-800' />
          <span className='flex items-center gap-1'><div className='w-1.5 h-1.5 rounded-full bg-blue-500' /> {MOCK_TASKS.filter(t => t.status === 'in-progress').length} em progresso</span>
        </div>
      </Topbar>

      <div className='flex-1 overflow-x-auto transition-colors'>
        <div className='flex h-full items-start'>
          {columns.map((column, index) => (
            <div key={column.id} className='w-[300px] min-w-[300px] shrink-0 h-full flex flex-col border-r border-zinc-200 dark:border-zinc-800/80'>
              <div className='px-2.5 py-3 group'>
                <div className='flex items-center justify-between mb-1'>
                  <div className='flex items-center gap-2'>
                    <div className={`w-2 h-2 rounded-full border border-current ${column.color}`} />
                    <h3 className='font-bold text-zinc-900 dark:text-zinc-100 text-sm'>{column.title}</h3>
                    <span className='text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-500 min-w-6 text-center px-0.5 py-px rounded-full font-bold'>
                      {MOCK_TASKS.filter(t => t.status === column.id).length}
                    </span>
                  </div>
                  <MoreHorizontal size={16} className='text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' />
                </div>
                <p className='text-xs text-zinc-500 leading-relaxed line-clamp-2 leading-4'>{column.description}</p>
              </div>

              <div
                className='flex-1 space-y-2 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800'
              >
                {MOCK_TASKS.filter(t => t.status === column.id).map(task => (
                  <div
                    key={task.id}
                    className='bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/60 p-3 rounded-lg shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group relative cursor-pointer'
                  >
                    <div className='flex items-start justify-between mb-2'>
                      <div className='flex items-center gap-1.5'>
                        <div className='w-4 h-4 rounded-full border border-emerald-500/50 flex items-center justify-center'>
                          <div className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
                        </div>
                        <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-tight'>
                          {task.project} #{task.id}
                        </span>
                      </div>
                      {task.assignee && (
                        <img
                          src={task.assignee.avatar}
                          className='w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100'
                          title={task.assignee.name}
                        />
                      )}
                    </div>

                    <h4 className='text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-3 leading-snug'>
                      {task.title}
                    </h4>

                    {task.tags && task.tags.length > 0 && (
                      <div className='flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-zinc-100/50 dark:border-zinc-800/30'>
                        {task.tags.map(tag => (
                          <span
                            key={tag.label}
                            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${tag.color}`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <button className='w-full py-2 flex items-center justify-start gap-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs font-medium transition-colors group'>
                  <Plus size={14} className='group-hover:scale-110 transition-transform' />
                  Adicionar item
                </button>
              </div>
            </div>
          ))}

          {/* Placeholder Column */}
          <div className='w-[300px] min-w-[300px] h-full flex flex-col shrink-0 px-2 pt-2 border-r border-zinc-200 dark:border-zinc-800/80'>
            <button className='w-full h-10 flex items-center justify-center gap-2 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs font-bold group'>
              <Plus size={16} className='group-hover:scale-110 transition-transform' />
              Novo Quadro
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}
