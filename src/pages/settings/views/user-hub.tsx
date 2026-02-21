import { Plus, Save, Camera, Shield, MoreVertical, User, Users2 } from 'lucide-react';

export function UserHub() {
    const session = { user: { name: "Usuário Exemplo", email: "user@deskreport.com.br", image: "" } };
    const users = [
        { name: 'Ana Souza', email: 'ana@deskreport.com.br', role: 'Vendedor', status: 'Ativo' },
        { name: 'Carlos Lima', email: 'carlos@deskreport.com.br', role: 'Representante', status: 'Ativo' },
        { name: 'Marcos Silva', email: 'marcos@deskreport.com.br', role: 'Admin', status: 'Ativo' },
    ];

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
                    <button className="bg-sky-500 hover:bg-sky-600 focus:ring-2 focus:ring-sky-500/50 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
                        <Save size={16} />
                        Salvar Alterações
                    </button>
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
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Nome Completo</label>
                                <input type="text" defaultValue={session?.user?.name || ''} className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">E-mail de Trabalho</label>
                                <input type="email" defaultValue={session?.user?.email || ''} readOnly className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm outline-none transition-all font-medium text-neutral-500 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">WhatsApp</label>
                                <input type="tel" defaultValue="+55 (11) 98765-4321" className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Cargo / Função</label>
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
                    <button className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-semibold transition-colors shadow-sm">
                        <Plus size={16} />
                        Convidar Novo
                    </button>
                </div>
                <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-[10px] uppercase text-neutral-400 font-bold border-b border-neutral-100 dark:border-neutral-800">
                            <tr>
                                <th className="px-6 py-4">Usuário</th>
                                <th className="px-6 py-4">Cargo</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {users.map((user, i) => (
                                <tr key={i} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center font-bold text-sky-600 text-xs">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{user.name}</span>
                                            <span className="text-[10px] text-neutral-500">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Shield size={12} className="text-sky-500" />
                                            <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md text-neutral-400 transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
