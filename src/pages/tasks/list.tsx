import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import { useParams } from 'react-router-dom';
import { MoreVertical, Search, Filter, Plus } from 'lucide-react';

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
  { id: '101', title: 'Permissões e Perfis', project: 'oneteam', status: 'in-progress', tags: [{ label: 'Feature', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }] },
  { id: '286', title: 'Adicionar alerta de tamanho de arquivo no ticket', project: 'oneteam', status: 'release', assignee: { name: 'rodriggopda', avatar: 'https://github.com/rodriggopda.png' } },
  { id: '318', title: 'Pesquisa de satisfação', project: 'oneteam', status: 'todo' },
  { id: '317', title: 'Adicionar campo de observação nos parametros', project: 'oneteam', status: 'review' },
  { id: '301', title: 'Pesquisa não está encontrando dados', project: 'oneteam', status: 'done', assignee: { name: 'rodriggopda', avatar: 'https://github.com/rodriggopda.png' } },
  { id: '309', title: 'SLA de Whatsapp não está funcionando', project: 'oneteam', status: 'done' },
  { id: '314', title: 'Cadastro de usuário via email', project: 'oneteam', status: 'todo' },
  { id: '310', title: 'Inserir filtro tela SLA', project: 'oneteam', status: 'done' },
  { id: '311', title: 'Workspace não está ficando setado', project: 'oneteam', status: 'done' },
  { id: '312', title: 'Usuários não admin sem senha', project: 'oneteam', status: 'done' },
  { id: '296', title: 'Criação e aplicação do SLA', project: 'oneteam', status: 'done' },
  { id: '308', title: 'SLA Tickets - tempo incorreto', project: 'oneteam', status: 'done' },
  { id: '401', title: 'Integração com API do Google Maps', project: 'billing', status: 'backlog' },
  { id: '402', title: 'Refatoração do módulo de autenticação', project: 'core', status: 'in-progress' },
  { id: '403', title: 'Correção de bug no upload de imagens', project: 'oneteam', status: 'todo' },
  { id: '404', title: 'Implementação de temas Dark/Light', project: 'ui-kit', status: 'review' },
  { id: '405', title: 'Otimização de consultas no banco de dados', project: 'core', status: 'release' },
  { id: '406', title: 'Novo componente de Dropdown acessível', project: 'ui-kit', status: 'done' },
  { id: '407', title: 'Documentação técnica da API', project: 'docs', status: 'todo' },
  { id: '408', title: 'Configuração de CI/CD para staging', project: 'ops', status: 'in-progress' },
  { id: '409', title: 'Melhoria na performance do Chat', project: 'oneteam', status: 'backlog' },
  { id: '410', title: 'Validação de campos de CPF/CNPJ', project: 'core', status: 'done' },
  { id: '411', title: 'Exportação de relatórios em PDF', project: 'billing', status: 'review' },
  { id: '412', title: 'Sistema de notificações Push', project: 'core', status: 'todo' },
  { id: '413', title: 'Chat interno corporativo', project: 'oneteam', status: 'backlog' },
  { id: '414', title: 'Ajuste de margens no layout mobile', project: 'ui-kit', status: 'release' },
  { id: '415', title: 'Tradução para Espanhol', project: 'core', status: 'todo' },
  { id: '416', title: 'Webhook para eventos de pagamento', project: 'billing', status: 'in-progress' },
  { id: '417', title: 'Módulo de inventário básico', project: 'oneteam', status: 'backlog' },
  { id: '418', title: 'Logs de atividades do usuário', project: 'core', status: 'done' },
  { id: '419', title: 'Dashboard de métricas em tempo real', project: 'analytics', status: 'review' },
  { id: '420', title: 'Auto-reply para mensagens fora do horário', project: 'automation', status: 'todo' }
];

const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string }> = {
  'backlog': { label: 'Backlog', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700' },
  'todo': { label: 'Para fazer', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700' },
  'in-progress': { label: 'Em andamento', color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30' },
  'review': { label: 'Revisão', color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30' },
  'release': { label: 'Release', color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30' },
  'done': { label: 'Concluído', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700/50' }
};

export function TaskList() {
  const { company_id, project_id } = useParams();
  const cId = company_id || '4go';
  const pId = project_id || 'deskreport';

  const navigation = [
    { name: 'Quadros', to: `/${cId}/${pId}/tasks/boards` },
    { name: 'Em Lista', to: `/${cId}/${pId}/tasks/list` },
  ]

  return (
    <Page navigation={navigation}>
      <Topbar title='Tarefas' smartHeader>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500' />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              className='pl-9 pr-4 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[11px] outline-none focus:ring-1 focus:ring-zinc-400 transition-all w-56'
            />
          </div>
          <button className='p-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors'>
            <Filter size={12} />
          </button>
          <div className='w-px h-3 bg-zinc-200 dark:bg-zinc-800 mx-1' />
          <button className='flex items-center gap-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 px-2.5 py-1 rounded-lg text-[11px] font-bold hover:opacity-90 transition-all'>
            <Plus size={12} />
            Nova Tarefa
          </button>
        </div>
      </Topbar>

      <div className='flex-1 overflow-auto transition-colors'>
        <div className='bg-white dark:bg-[#0f0f11] border-b border-zinc-200 dark:border-zinc-800 min-h-full'>
          <table className='w-full text-left border-collapse table-fixed'>
            <thead>
              <tr className='border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 sticky top-0 z-10'>
                <th className='py-2 px-4 text-[10px] font-black uppercase tracking-wider text-zinc-400 w-12 border-r border-zinc-200 dark:border-zinc-800'>ID</th>
                <th className='py-2 px-4 text-[10px] font-black uppercase tracking-wider text-zinc-400 border-r border-zinc-200 dark:border-zinc-800'>
                  Título
                </th>
                <th className='py-2 px-4 text-[10px] font-black uppercase tracking-wider text-zinc-400 w-44 border-r border-zinc-200 dark:border-zinc-800'>
                  Atribuído
                </th>
                <th className='py-2 px-4 text-[10px] font-black uppercase tracking-wider text-zinc-400 w-36 border-r border-zinc-200 dark:border-zinc-800'>
                  Status
                </th>
                <th className='py-2 px-2 w-10'></th>
              </tr>
            </thead>
            <tbody className='divide-y divide-zinc-200 dark:divide-zinc-800'>
              {MOCK_TASKS.map((task) => (
                <tr key={task.id} className='hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer'>
                  <td className='py-1.5 px-4 text-[10px] font-bold text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 text-center'>#{task.id}</td>
                  <td className='py-1.5 px-4 border-r border-zinc-200 dark:border-zinc-800'>
                    <div className='flex items-center gap-2'>
                      <div className={`shrink-0 w-4 h-4 rounded-full border border-emerald-500/40 flex items-center justify-center bg-emerald-500/5`}>
                        <div className='w-1 h-1 rounded-full bg-emerald-500' />
                      </div>
                      <span className='group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-[12px] font-semibold text-zinc-900 dark:text-zinc-200 transition-colors truncate'>
                        {task.title}
                      </span>
                    </div>
                  </td>
                  <td className='py-1.5 px-4 border-r border-zinc-200 dark:border-zinc-800'>
                    {task.assignee ? (
                      <div className='flex items-center gap-1.5'>
                        <img src={task.assignee.avatar} className='w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100' />
                        <span className='text-[11px] text-zinc-600 dark:text-zinc-400 font-medium truncate'>{task.assignee.name}</span>
                      </div>
                    ) : (
                      <span className='text-zinc-300 dark:text-zinc-800 text-[11px]'>—</span>
                    )}
                  </td>
                  <td className='py-1.5 px-4 border-r border-zinc-200 dark:border-zinc-800'>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tight border ${STATUS_CONFIG[task.status].color}`}>
                      {STATUS_CONFIG[task.status].label}
                    </span>
                  </td>
                  <td className='py-1.5 px-2 text-center'>
                    <button className='p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all'>
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0f0f11] py-3 px-6 flex items-center justify-between text-[11px] text-zinc-500'>
        <span>Mostrando {MOCK_TASKS.length} tarefas</span>
        <div className='flex items-center gap-1 font-bold'>
          <button className='px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors'>Anterior</button>
          <button className='px-2 py-1 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950'>1</button>
          <button className='px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors'>Próxima</button>
        </div>
      </div>
    </Page>
  );
}
