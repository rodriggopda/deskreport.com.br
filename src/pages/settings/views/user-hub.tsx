import { Plus, Save, Camera, Shield, X } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { authClient, useSession } from '../../../lib/auth-client';
import { useState, useEffect } from 'react';
import { useTenant } from '../../../hooks/useTenant';
import { useTenantStore } from '../../../store';

export function UserHub() {
    const { data: session } = useSession();
    const { company_id } = useTenant();
    const { organizations } = useTenantStore();

    // Fallback: se company_id não bater com o ID, tenta pegar por slug
    const currentOrg = organizations.find(o => o.id === company_id || (o as any).slug === company_id) || organizations[0];
    const activeOrganizationId = currentOrg?.id; // Pegando o original ID (o topbar as vezes envia o slug)

    const [members, setMembers] = useState<any[]>([]);
    const [isInviting, setIsInviting] = useState(false);
    const [memberEmail, setMemberEmail] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [inviteRole, setInviteRole] = useState('member');

    useEffect(() => {
        if (activeOrganizationId) {
            loadMembers();
        }
    }, [activeOrganizationId]);

    const loadMembers = async () => {
        try {
            if (!activeOrganizationId) return;
            const { data } = await authClient.organization.getFullOrganization({
                query: { organizationId: activeOrganizationId }
            });
            if (data?.members) {
                setMembers(data.members);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. Create User internally via Better-Auth Admin Plugin
            const { data: newUser } = await authClient.admin.createUser({
                email: memberEmail,
                name: memberName,
                password: memberPassword,
                role: inviteRole === 'admin' ? 'admin' : 'user'
            });

            if (!newUser?.user?.id) throw new Error('Falha na criação do usuário.');

            // 2. Link created User explicitly to the Tenant mapping via Custom API
            await authClient.$fetch('http://localhost:3000/settings/members/link', {
                method: 'POST',
                headers: { 'x-organization-id': activeOrganizationId },
                body: {
                    userId: newUser.user.id,
                    role: inviteRole
                }
            });

            setIsInviting(false);
            setMemberEmail('');
            setMemberName('');
            setMemberPassword('');
            loadMembers();
            // TODO: Feedback toast success
        } catch (e) {
            console.error(e);
            alert("Ocorreu um erro ao criar o usuário. Tente novamente.");
        }
    };

    const handleRemoveMember = async (memberId: string) => {
        if (!confirm('Deseja realmente remover este membro?')) return;
        try {
            await authClient.organization.removeMember({
                memberIdOrEmail: memberId,
                organizationId: activeOrganizationId
            });
            loadMembers();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="space-y-12 animate-slide-up pb-10">
            {/* HEADER INFORMATIVO */}
            <div className="mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-6">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
                    Minha Conta e Usuários
                </h2>
                <p className="text-sm text-neutral-500 max-w-2xl">
                    Atualize seu perfil pessoal e gerencie as permissões de acesso do seu time. Mantenha os dados de contato sempre atualizados para facilitar a comunicação.
                </p>
            </div>
            {/* MEU PERFIL */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-lg">Meu Perfil</h3>
                        <p className="text-xs text-neutral-500">Credenciais pessoais e foto de avatar</p>
                    </div>
                    <Button size="md" className="gap-2">
                        <Save size={16} />
                        Salvar Alterações
                    </Button>
                </div>
                <div className="bg-transparent">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center overflow-hidden border-2 border-dashed border-sky-300 dark:border-sky-700">
                                <img src={session?.user?.image || "https://robohash.org/rodrigo.png?set=set5"} alt="Avatar" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera size={20} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400">Nome Completo</label>
                                <input type="text" defaultValue={session?.user?.name || ''} className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400">E-mail de Trabalho</label>
                                <input type="email" defaultValue={session?.user?.email || ''} readOnly className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm outline-none transition-all font-medium text-neutral-500 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400">WhatsApp</label>
                                <input type="tel" defaultValue="+55 (11) 98765-4321" className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400">Cargo / Função</label>
                                <input type="text" defaultValue="Administrador" className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TIME E REPRESENTANTES */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-lg">Time e Representantes</h3>
                        <p className="text-xs text-neutral-500 mt-1">Gerencie os acessos e permissões da sua equipe.</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsInviting(true)}>
                        <Plus size={16} />
                        Adicionar Manualmente
                    </Button>
                </div>
                <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-50 dark:bg-neutral-800 text-[10px] text-neutral-400 font-bold border-b border-neutral-100 dark:border-neutral-800">
                            <tr>
                                <th className="px-6 py-4">Membro</th>
                                <th className="px-6 py-4">Cargo</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {members.map((member) => (
                                <tr key={member.id} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center font-bold text-sky-600 text-xs overflow-hidden border border-sky-200 dark:border-sky-800">
                                            {member.user?.name ? member.user.name.charAt(0).toUpperCase() : '?'}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{member.user?.name || member.email}</span>
                                            <span className="text-[10px] text-neutral-500">{member.user?.email || member.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Shield size={12} className="text-sky-500" />
                                            <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium capitalize">{member.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
                                            Ativo
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" onClick={() => handleRemoveMember(member.id)}>
                                            <X size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {members.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-neutral-500">
                                        Nenhum membro encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL DE CRIAÇÃO */}
            {isInviting && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Adicionar Membro (Sem Convite)</h3>
                            <button onClick={() => setIsInviting(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleInvite} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-zinc-400">Nome do Membro</label>
                                <input
                                    autoFocus
                                    type="text"
                                    required
                                    value={memberName}
                                    onChange={(e) => setMemberName(e.target.value)}
                                    placeholder="Ex: João da Silva"
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-zinc-400">E-mail de Login</label>
                                <input
                                    type="email"
                                    required
                                    value={memberEmail}
                                    onChange={(e) => setMemberEmail(e.target.value)}
                                    placeholder="exemplo@empresa.com"
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-zinc-400">Senha Padrão (Provisória)</label>
                                <input
                                    type="text"
                                    required
                                    value={memberPassword}
                                    onChange={(e) => setMemberPassword(e.target.value)}
                                    placeholder="*******"
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-zinc-400">Cargo de Acesso</label>
                                <select
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-all font-medium"
                                >
                                    <option value="member">Membro (Padrão)</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsInviting(false)}>Cancelar</Button>
                                <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white border-0">
                                    Criar Usuário
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
