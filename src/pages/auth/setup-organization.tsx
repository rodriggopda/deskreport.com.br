import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authClient } from '../../lib/auth-client';
import { Button } from '../../components/ui/button';
import { Check, Building2, Briefcase, Zap, Settings, ArrowRight, MessageCircle } from 'lucide-react';

const MODULES = [
    { id: 'tasks', name: 'Tarefas (Kanban, Listas)', icon: <Building2 size={18} /> },
    { id: 'chat', name: 'Chat Omnichannel', icon: <Zap size={18} /> },
    { id: 'automation', name: 'Automações (Bots, Modelos)', icon: <Settings size={18} /> },
    { id: 'projects', name: 'Gestão de Projetos', icon: <Briefcase size={18} /> },
    { id: 'internal_chat', name: 'Chat Interno', icon: <MessageCircle size={18} /> },
];

export function SetupOrganization() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [industry, setIndustry] = useState('');
    const [selectedModules, setSelectedModules] = useState<string[]>(['tasks', 'chat']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleModule = (id: string) => {
        setSelectedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !industry.trim()) {
            setError('Preencha os campos obrigatórios.');
            return;
        }

        if (selectedModules.length === 0) {
            setError('Selecione pelo menos um módulo.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { data: organization, error } = await authClient.organization.create({
                name,
                slug: name.toLowerCase().split(' ')[0] || 'org',
                logo: '',
            });

            if (error) throw new Error(error.message);

            if (organization) {
                // If better-auth handles metadata directly we could have passed it above,
                // but if not, organization.update is an option, or since we only
                // need organization setup to bypass guard, we redirect:
                const { error: updateError } = await authClient.organization.update({
                    organizationId: organization.id,
                    data: {
                        name, // Keep name in data for update, as it's part of the organization object
                        metadata: {
                            industry,
                            modules: selectedModules
                        }
                    }
                });

                if (updateError) throw new Error(updateError.message);

                authClient.organization.setActive({ organizationId: organization.id });
                navigate(`/${organization.id}`);
            }

        } catch (err: any) {
            setError(err.message || 'Erro ao criar organização. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* Left side form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 lg:p-24 overflow-y-auto">
                <div className="max-w-md mx-auto w-full">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <Building2 size={18} className="text-white" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">Setup da Empresa</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight mb-3">Boas-vindas ao DeskReport</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Para começar, vamos configurar o espaço de trabalho da sua empresa na plataforma.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <h2 className="text-sm font-black uppercase text-zinc-400 tracking-widest">Informações Básicas</h2>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Nome da Empresa
                                </span>
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="px-4 py-3 bg-white dark:bg-zinc-900 w-full rounded-xl outline-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-blue-500 transition-all text-sm"
                                    type="text"
                                    placeholder="Ex: Acme Corp"
                                />
                            </label>

                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Ramo de Atuação
                                </span>
                                <input
                                    required
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    className="px-4 py-3 bg-white dark:bg-zinc-900 w-full rounded-xl outline-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-blue-500 transition-all text-sm"
                                    type="text"
                                    placeholder="Ex: Tecnologia, Varejo, Saúde..."
                                />
                            </label>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-sm font-black uppercase text-zinc-400 tracking-widest">Módulos Utilizados</h2>
                            <p className="text-sm text-zinc-500 mb-4">
                                Selecione os módulos que sua equipe irá utilizar (você pode alterar isso depois).
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {MODULES.map(module => {
                                    const isSelected = selectedModules.includes(module.id);
                                    return (
                                        <div
                                            key={module.id}
                                            onClick={() => toggleModule(module.id)}
                                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected
                                                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10'
                                                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col gap-2">
                                                    <span className={`p-2 rounded-lg w-fit ${isSelected ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                                                        {module.icon}
                                                    </span>
                                                    <span className={`font-semibold text-sm ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                                        {module.name}
                                                    </span>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-zinc-300 dark:border-zinc-700'
                                                    }`}>
                                                    {isSelected && <Check size={12} className="text-white" />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" disabled={loading} className="w-full py-6 text-base group gap-2">
                                {loading ? 'Criando sua empresa...' : 'Concluir e Acessar Plataforma'}
                                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right side illustration (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-zinc-100 dark:bg-[#0c0c0e] border-l border-zinc-200 dark:border-zinc-800 items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

                {/* Abstract UI Representation */}
                <div className="w-full max-w-md space-y-6 relative z-10 transition-transform duration-700 hover:scale-105">
                    {/* Fake Topbar */}
                    <div className="h-16 w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 flex items-center px-6 gap-4">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                        <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                        <div className="ml-auto flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                            <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                        </div>
                    </div>

                    {/* Fake Content area */}
                    <div className="flex gap-6">
                        {/* Sidebar */}
                        <div className="w-16 h-64 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col items-center py-6 gap-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg opacity-20" />
                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                        </div>

                        {/* Main Board */}
                        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 w-20 bg-emerald-500/20 rounded-full" />
                                    <div className="h-24 w-full bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800" />
                                    <div className="h-24 w-full bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800" />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 w-24 bg-blue-500/20 rounded-full" />
                                    <div className="h-24 w-full bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
