import { useState } from 'react';
import { ArrowLeft, Search, Users, X, UserPlus } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface PermissionFormProps {
    onBack: () => void;
}

const PERMISSION_SECTIONS = [
    {
        id: 'admin',
        title: 'Acesso total de administrador',
        permissions: [
            { id: 'admin_all', title: 'Controle total do sistema', description: 'Acesso de super usuário a todos os recursos' }
        ]
    },
    {
        id: 'remote',
        title: 'Gerenciamento remoto',
        permissions: [
            { id: 'remote_access', title: 'Acesso Remoto', description: 'Permite iniciar sessões de acesso remoto' },
            { id: 'remote_terminal', title: 'Terminal Remoto', description: 'Permite acesso ao terminal' }
        ]
    },
    {
        id: 'rmm',
        title: 'Administração RMM',
        permissions: [
            { id: 'rmm_agents', title: 'Gerenciar Agentes', description: 'Instalar ou remover agentes do sistema' },
            { id: 'rmm_scripts', title: 'Gerenciar Scripts', description: 'Criar e editar scripts de execução' }
        ]
    },
    {
        id: 'tickets',
        title: 'Atendimento de chamados',
        permissions: [
            { id: 'ticket_all_assigned', title: 'Acesse todos os tickets atribuídos', description: 'Acessar ingressos atribuídos a outros técnicos' },
            { id: 'ticket_unassigned', title: 'Acessar tickets não atribuídos', description: 'Acesse todos os tickets não atribuídos' },
            { id: 'ticket_auto_assign', title: 'Incluir na atribuição automatizada', description: 'Incluir usuário na lista de autoatribuição dentro das regras de automação de tickets' },
            { id: 'ticket_products', title: 'Gerenciar produtos de bilhete', description: 'Adicionar, editar e excluir produtos relacionados a ingressos' },
            { id: 'ticket_expenses', title: 'Gerenciar despesas de bilhetes', description: 'Adicionar, editar e excluir despesas relacionadas a ingressos' },
            { id: 'ticket_delete', title: 'Excluir ingressos', description: 'Excluir tickets atribuídos e acessíveis' },
            { id: 'ticket_merge', title: 'Mesclar tickets', description: 'Mesclar tickets atribuídos e acessíveis' }
        ]
    },
    {
        id: 'system',
        title: 'Sistema',
        permissions: [
            { id: 'sys_settings', title: 'Configurações Globais', description: 'Alterar parametrizações do sistema' },
            { id: 'sys_billing', title: 'Faturamento', description: 'Gerenciar assinaturas e pagamentos' }
        ]
    }
];

export function PermissionForm({ onBack }: PermissionFormProps) {
    const [selectedSection, setSelectedSection] = useState('tickets');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMembersOpen, setIsMembersOpen] = useState(false);

    const togglePermission = (id: string) => {
        setSelectedPermissions(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const toggleSectionAll = (_sectionId: string, permissions: any[]) => {
        const allPermissionIds = permissions.map(p => p.id);
        const allSelected = allPermissionIds.every(id => selectedPermissions.includes(id));

        if (allSelected) {
            setSelectedPermissions(prev => prev.filter(id => !allPermissionIds.includes(id)));
        } else {
            setSelectedPermissions(prev => {
                const uniqueIds = new Set([...prev, ...allPermissionIds]);
                return Array.from(uniqueIds);
            });
        }
    };

    const activeSection = PERMISSION_SECTIONS.find(s => s.id === selectedSection);

    return (
        <div className="flex flex-col h-full w-full animate-in fade-in duration-300">
            {/* HEADER */}
            <div className="flex items-start justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                <div className="flex items-start gap-4">
                    <button
                        onClick={onBack}
                        className="mt-1 p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
                    >
                        <ArrowLeft size={20} className="text-neutral-500" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Perfil de Acesso</h2>
                        <div className="text-[11px] text-neutral-500 font-medium">
                            Configure permissões granulares para esta função
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 text-right">
                    <Button variant="outline" onClick={onBack}>Cancelar</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0" onClick={onBack}>Salvar</Button>
                </div>
            </div>

            {/* INNER TABS */}
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 mb-6 px-12">
                <div className="flex gap-6">
                    <button className="text-sm font-bold text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white pb-3 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Permissões
                    </button>
                    <button className="text-sm font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 pb-3 flex items-center gap-2 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
                        Acesso a sites
                    </button>
                </div>

                <button
                    onClick={() => setIsMembersOpen(true)}
                    className="mb-3 flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all"
                >
                    <Users size={14} />
                    Membros da função (0)
                </button>
            </div>

            {/* TWO PANE LAYOUT */}
            <div className="flex gap-8 flex-1 pl-12 pr-12">
                {/* PANE 1: Sections Menu */}
                <div className="w-64 flex flex-col gap-4">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar permissões"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-neutral-200 dark:border-neutral-700 rounded-lg outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col space-y-1 mt-2">
                        {PERMISSION_SECTIONS.map(section => {
                            const total = section.permissions.length;
                            const selected = section.permissions.filter(p => selectedPermissions.includes(p.id)).length;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setSelectedSection(section.id)}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${selectedSection === section.id ? 'bg-neutral-100 dark:bg-neutral-800/50 font-bold text-neutral-900 dark:text-white' : 'font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/20'}`}
                                >
                                    <span className="truncate pr-2">{section.title}</span>
                                    <span className="text-[10px] text-neutral-400 font-semibold">{selected}/{total}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 flex flex-col pr-8">
                    {activeSection && (
                        <div className="animate-in fade-in duration-200">
                            {/* Select All Checkbox */}
                            <label className="flex items-center gap-3 py-3 border-b border-neutral-200 dark:border-neutral-800 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="peer appearance-none w-4 h-4 border border-neutral-300 dark:border-neutral-600 rounded bg-transparent checked:bg-blue-500 checked:border-blue-500 cursor-pointer transition-colors"
                                        checked={activeSection.permissions.every(p => selectedPermissions.includes(p.id))}
                                        onChange={() => toggleSectionAll(activeSection.id, activeSection.permissions)}
                                    />
                                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <span className="text-[15px] font-bold text-neutral-900 dark:text-white select-none">
                                    {activeSection.title}
                                </span>
                            </label>

                            {/* Individual Checkboxes */}
                            <div className="mt-2 pl-7 flex flex-col">
                                {activeSection.permissions.map(perm => (
                                    <label key={perm.id} className="flex items-start gap-3 py-4 border-b border-neutral-100 dark:border-neutral-800/50 cursor-pointer group">
                                        <div className="relative flex items-center justify-center mt-0.5">
                                            <input
                                                type="checkbox"
                                                className="peer appearance-none w-4 h-4 border border-neutral-300 dark:border-neutral-600 rounded bg-transparent checked:bg-blue-500 checked:border-blue-500 cursor-pointer transition-colors"
                                                checked={selectedPermissions.includes(perm.id)}
                                                onChange={() => togglePermission(perm.id)}
                                            />
                                            <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <div className="flex flex-col select-none">
                                            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-0.5">{perm.title}</span>
                                            <span className="text-xs text-neutral-500">{perm.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* MEMBERS MODAL */}
            {isMembersOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <Users size={18} className="text-blue-500" />
                                Membros da função
                            </h3>
                            <button onClick={() => setIsMembersOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-zinc-400">Atribuir novos técnicos</label>
                                <div className="flex gap-2">
                                    <select className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-all font-medium">
                                        <option value="">Selecionar técnicos...</option>
                                    </select>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 gap-2 h-auto px-4">
                                        <UserPlus size={16} />
                                        Atribuir
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-zinc-400">Técnicos já atribuídos</label>
                                <div className="border border-zinc-100 dark:border-zinc-800/50 rounded-xl divide-y divide-zinc-50 dark:divide-zinc-800">
                                    <div className="px-12 py-10 flex flex-col items-center justify-center text-center">
                                        <Users size={32} className="text-zinc-200 dark:text-zinc-800 mb-3" />
                                        <p className="text-sm font-bold text-zinc-400">Nenhum técnico atribuído</p>
                                        <p className="text-[10px] text-zinc-400 mt-1">Selecione técnicos acima para dar acesso a esta função.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/20 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                            <Button onClick={() => setIsMembersOpen(false)} className="bg-zinc-900 dark:bg-zinc-700 text-white border-0">Fechar</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
