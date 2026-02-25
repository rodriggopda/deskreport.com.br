import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { X } from 'lucide-react';
import { authClient } from '../../lib/auth-client';
import { useTenantStore } from '../../store';
import { useTenant } from '../../hooks/useTenant';

interface EditProjectModalProps {
    project: any | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function EditProjectModal({ project, onClose, onSuccess }: EditProjectModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active');
    const [loading, setLoading] = useState(false);
    const { fetchProjects } = useTenantStore();
    const { company_id } = useTenant();

    useEffect(() => {
        if (project) {
            setName(project.name || '');
            setDescription(project.description || '');
            setStatus(project.status || 'active');
        } else {
            setName('');
            setDescription('');
            setStatus('active');
        }
    }, [project]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        const headers: any = {};
        if (company_id) {
            headers['x-organization-id'] = company_id;
        }

        try {
            if (project) {
                await authClient.$fetch(`http://localhost:3000/projects/${project.id}`, {
                    method: 'PUT',
                    body: { name, description, status },
                    headers
                });
            } else {
                await authClient.$fetch('http://localhost:3000/projects', {
                    method: 'POST',
                    body: { name, description, status },
                    headers
                });
            }
            if (company_id) {
                await fetchProjects(company_id);
            }
            onSuccess();
        } catch (error) {
            console.error('Failed to save project:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                        {project ? 'Editar Projeto' : 'Novo Projeto'}
                    </h3>
                    <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400">Nome do Projeto</label>
                        <input
                            autoFocus
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Comercial, Marketing..."
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400">Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descreva o propósito deste projeto..."
                            className="w-full min-h-[100px] resize-none bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all font-medium"
                        >
                            <option value="active">Ativo</option>
                            <option value="archived">Arquivado</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-6">
                        <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="flex-1" disabled={loading}>
                            {loading ? 'Salvando...' : (project ? 'Salvar Alterações' : 'Criar Projeto')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
