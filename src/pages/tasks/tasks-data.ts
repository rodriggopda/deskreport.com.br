export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done' | 'release';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskCardProps = {
    id: string;
    title: string;
    project: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string;
    assignee?: {
        name: string;
        avatar: string;
    };
    tags?: { label: string; color: string }[];
}

export const MOCK_TASKS: TaskCardProps[] = [
    { id: '101', title: 'Permissões e Perfis', project: 'oneteam', status: 'in-progress', priority: 'high', createdAt: '2024-02-20T10:00:00Z', tags: [{ label: 'Feature', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }, { label: 'Módulo Ticket', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' }, { label: 'Módulo WhatsApp', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' }] },
    { id: '286', title: 'Alerta de tamanho de arquivo', project: 'oneteam', status: 'release', priority: 'medium', createdAt: '2024-02-19T14:30:00Z', assignee: { name: 'rodriggopda', avatar: 'https://github.com/rodriggopda.png' }, tags: [{ label: 'Melhoria', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }] },
    { id: '318', title: 'Pesquisa de satisfação', project: 'oneteam', status: 'todo', priority: 'low', createdAt: '2024-02-21T09:15:00Z', tags: [{ label: 'Feature', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }] },
    { id: '317', title: 'Campo de observação parametros', project: 'oneteam', status: 'review', priority: 'medium', createdAt: '2024-02-21T11:45:00Z', tags: [{ label: 'Melhoria', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }] },
    { id: '301', title: 'Pesquisa não encontrando dados', project: 'oneteam', status: 'done', priority: 'urgent', createdAt: '2024-02-18T16:20:00Z', assignee: { name: 'rodriggopda', avatar: 'https://github.com/rodriggopda.png' }, tags: [{ label: 'Bug', color: 'bg-red-500/10 text-red-500 border-red-500/20' }] },
    { id: '309', title: 'SLA de Whatsapp instável', project: 'oneteam', status: 'done', priority: 'urgent', createdAt: '2024-02-17T08:00:00Z', tags: [{ label: 'Bug', color: 'bg-red-500/10 text-red-500 border-red-500/20' }] },
    { id: '314', title: 'Cadastro via email', project: 'oneteam', status: 'todo', priority: 'medium', createdAt: '2024-02-22T13:00:00Z' },
    { id: '310', title: 'Filtro tela SLA', project: 'oneteam', status: 'done', priority: 'low', createdAt: '2024-02-16T15:00:00Z' },
    { id: '311', title: 'Workspace bug no edit', project: 'oneteam', status: 'done', priority: 'medium', createdAt: '2024-02-15T10:00:00Z' },
    { id: '312', title: 'Usuários não admin s/ senha', project: 'oneteam', status: 'done', priority: 'low', createdAt: '2024-02-14T11:00:00Z' },
    { id: '296', title: 'Aplicação do SLA', project: 'oneteam', status: 'done', priority: 'high', createdAt: '2024-02-13T16:00:00Z' },
    { id: '308', title: 'SLA Tickets tempo incorreto', project: 'oneteam', status: 'done', priority: 'medium', createdAt: '2024-02-12T09:00:00Z' },
    { id: '401', title: 'Integração Google Maps', project: 'billing', status: 'backlog', priority: 'high', createdAt: '2024-02-23T08:30:00Z' },
    { id: '402', title: 'Refatoração Auth', project: 'core', status: 'in-progress', priority: 'high', createdAt: '2024-02-22T09:00:00Z' },
    { id: '403', title: 'Upload bug fix', project: 'oneteam', status: 'todo', priority: 'medium', createdAt: '2024-02-22T11:00:00Z' },
    { id: '404', title: 'Temas Dark/Light', project: 'ui-kit', status: 'review', priority: 'low', createdAt: '2024-02-21T14:00:00Z' },
    { id: '405', title: 'DB Performance', project: 'core', status: 'release', priority: 'urgent', createdAt: '2024-02-20T16:00:00Z' },
    { id: '406', title: 'Dropdown Acessível', project: 'ui-kit', status: 'done', priority: 'medium', createdAt: '2024-02-19T10:00:00Z' },
    { id: '407', title: 'API Docs', project: 'docs', status: 'todo', priority: 'low', createdAt: '2024-02-18T09:00:00Z' },
    { id: '408', title: 'CI/CD Config', project: 'ops', status: 'in-progress', priority: 'high', createdAt: '2024-02-17T11:30:00Z' },
    { id: '409', title: 'Chat Optimization', project: 'oneteam', status: 'backlog', priority: 'medium', createdAt: '2024-02-16T14:45:00Z' },
    { id: '410', title: 'CPF/CNPJ Validation', project: 'core', status: 'done', priority: 'low', createdAt: '2024-02-15T15:20:00Z' },
    { id: '411', title: 'PDF Reports', project: 'billing', status: 'review', priority: 'medium', createdAt: '2024-02-14T08:00:00Z' },
    { id: '412', title: 'Push Notifications', project: 'core', status: 'todo', priority: 'high', createdAt: '2024-02-13T10:00:00Z' },
    { id: '421', title: 'Automated Testing Setup', project: 'core', status: 'todo', priority: 'high', createdAt: '2024-02-12T10:00:00Z' },
    { id: '422', title: 'User Analytics Dashboard', project: 'analytics', status: 'in-progress', priority: 'medium', createdAt: '2024-02-11T14:00:00Z' },
    { id: '423', title: 'OAuth2 Provider Support', project: 'core', status: 'backlog', priority: 'high', createdAt: '2024-02-10T09:00:00Z' },
];

export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string }> = {
    'backlog': { label: 'Backlog', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700' },
    'todo': { label: 'Para fazer', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700' },
    'in-progress': { label: 'Em andamento', color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30' },
    'review': { label: 'Revisão', color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30' },
    'release': { label: 'Release', color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30' },
    'done': { label: 'Concluído', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700/50' }
};

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string; icon: string }> = {
    'low': { label: 'Baixa', color: 'text-zinc-400', icon: '↓' },
    'medium': { label: 'Média', color: 'text-blue-500', icon: '●' },
    'high': { label: 'Alta', color: 'text-orange-500', icon: '↑' },
    'urgent': { label: 'Urgente', color: 'text-red-500', icon: '▲' }
};
