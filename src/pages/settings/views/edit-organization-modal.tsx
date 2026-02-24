import { useState } from 'react';
import { X, Check, Building2, Briefcase, Zap, Settings, MessageCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { authClient } from '../../../lib/auth-client';

const MODULES = [
    { id: 'tasks', name: 'Tarefas (Kanban, Listas)', icon: <Building2 size={18} /> },
    { id: 'chat', name: 'Chat Omnichannel', icon: <Zap size={18} /> },
    { id: 'automation', name: 'Automações (Bots, Modelos)', icon: <Settings size={18} /> },
    { id: 'projects', name: 'Gestão de Projetos', icon: <Briefcase size={18} /> },
    { id: 'internal_chat', name: 'Chat Interno', icon: <MessageCircle size={18} /> },
];

export function EditOrganizationModal({
    organization,
    onClose,
    onSuccess
}: {
    organization: any;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const orgMetadata = organization.metadata ? (typeof organization.metadata === 'string' ? JSON.parse(organization.metadata) : organization.metadata) : {};

    const [name, setName] = useState(organization.name || '');
    const [slug, setSlug] = useState(organization.slug || '');
    const [industry, setIndustry] = useState(orgMetadata.industry || '');
    const [selectedModules, setSelectedModules] = useState<string[]>(orgMetadata.modules || []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleModule = (id: string) => {
        setSelectedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error: updateError } = await authClient.organization.update({
                organizationId: organization.id,
                data: {
                    name,
                    slug,
                    metadata: {
                        industry,
                        modules: selectedModules
                    }
                }
            });

            if (updateError) throw new Error(updateError.message);

            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Erro ao atualizar organização. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-zinc-950 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
                <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                            Editar Organização
                        </h3>
                        <p className="text-sm text-zinc-500">
                            Modifique os detalhes principais e módulos do negócio
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <form id="edit-org-form" onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <label className="block">
                                <span className="block mb-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Nome da Organização
                                </span>
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="px-3 py-2 bg-white dark:bg-zinc-900 w-full rounded-xl outline-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-blue-500 transition-all text-sm"
                                    type="text"
                                />
                            </label>

                            <label className="block">
                                <span className="block mb-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Slug (URL Amigável)
                                </span>
                                <input
                                    required
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="px-3 py-2 bg-white dark:bg-zinc-900 w-full rounded-xl outline-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-blue-500 transition-all text-sm font-mono"
                                    type="text"
                                />
                            </label>

                            <label className="block">
                                <span className="block mb-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Ramo de Atuação
                                </span>
                                <input
                                    required
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    className="px-3 py-2 bg-white dark:bg-zinc-900 w-full rounded-xl outline-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-blue-500 transition-all text-sm"
                                    type="text"
                                />
                            </label>
                        </div>

                        <div>
                            <span className="block mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Módulos Ativos
                            </span>
                            <div className="space-y-2">
                                {MODULES.map(module => {
                                    const isSelected = selectedModules.includes(module.id);
                                    return (
                                        <div
                                            key={module.id}
                                            onClick={() => toggleModule(module.id)}
                                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${isSelected
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                                                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-1.5 rounded-lg ${isSelected ? 'text-blue-600' : 'text-zinc-400'}`}>
                                                    {module.icon}
                                                </div>
                                                <span className={`text-sm font-medium ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                                    {module.name}
                                                </span>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-zinc-300 dark:border-zinc-700'
                                                }`}>
                                                {isSelected && <Check size={10} className="text-white" />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" form="edit-org-form" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
