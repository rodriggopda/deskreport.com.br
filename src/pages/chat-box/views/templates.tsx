import { Plus, FileText, Copy, Edit2, Trash2 } from 'lucide-react';
import { Page } from '../../../components/layout/page';
import { Topbar } from '../../../components/layout/topbar';

export default function MessageTemplates() {
    const navigation = [
        { name: 'Conversas', to: '/chat/conversations' },
        { name: 'Modelos de mensagens', to: '/chat/templates' },
        { name: 'Mensagens automáticas', to: '/chat/automation' },
        { name: 'Construtor de Bots', to: '/chat/builder' },
    ];

    const templates = [
        { id: 1, name: 'Saudação Inicial', content: 'Olá! Seja bem-vindo ao suporte da 4Go. Como podemos te ajudar hoje?', category: 'Atendimento' },
        { id: 2, name: 'Finalização de Ticket', content: 'Seu atendimento foi finalizado. Caso precise de algo mais, estamos à disposição.', category: 'Encerramento' },
        { id: 3, name: 'Solicitação de Dados', content: 'Para prosseguir com seu atendimento, por favor me informe o seu CPF ou CNPJ.', category: 'Dados' },
        { id: 4, name: 'Aviso de Indisponibilidade', content: 'No momento todos os nossos atendentes estão ocupados. Você é o próximo da fila.', category: 'Sistema' },
    ];

    return (
        <Page navigation={navigation}>
            <Topbar title='Modelos de Mensagens' inputSearch='off' />

            <div className='p-8 bg-zinc-50 dark:bg-zinc-950 min-h-[calc(100vh-68px)] transition-colors'>
                <div className='max-w-6xl mx-auto'>
                    <div className='flex items-center justify-between mb-8'>
                        <div>
                            <h2 className='text-2xl font-bold text-zinc-900 dark:text-zinc-100'>Seus Modelos</h2>
                            <p className='text-zinc-500 dark:text-zinc-400 mt-1'>Gerencie respostas rápidas para agilizar seu suporte.</p>
                        </div>
                        <button className='flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all shadow-sm'>
                            <Plus size={18} />
                            Novo Modelo
                        </button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {templates.map((template) => (
                            <div key={template.id} className='bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group shadow-sm'>
                                <div className='flex items-start justify-between mb-4'>
                                    <div className='w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-400'>
                                        <FileText size={20} />
                                    </div>
                                    <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <button className='p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                                            <Copy size={16} />
                                        </button>
                                        <button className='p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                                            <Edit2 size={16} />
                                        </button>
                                        <button className='p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500 hover:text-red-600'>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className='font-semibold text-zinc-900 dark:text-zinc-100 mb-2'>{template.name}</h3>
                                <p className='text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4 leading-relaxed'>
                                    "{template.content}"
                                </p>
                                <div className='pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between'>
                                    <span className='px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded text-[10px] font-bold uppercase tracking-wider'>
                                        {template.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Page>
    );
}
