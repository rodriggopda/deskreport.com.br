import { useEffect, useState } from 'react';
import { Plus, Briefcase, ArchiveRestore, Archive } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { authClient } from '../../lib/auth-client';
import { EditProjectModal } from './edit-project-modal';
import { useTenant } from '../../hooks/useTenant';

export function ProjectsHub() {
    const [projects, setProjects] = useState<any[]>([]);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const { company_id } = useTenant();

    useEffect(() => {
        if (company_id) {
            loadProjects();
        }
    }, [company_id]);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const headers: any = {};
            if (company_id) headers['x-organization-id'] = company_id;

            const { data } = await authClient.$fetch<any[]>('http://10.0.0.150:3000/projects', {
                headers
            });
            if (data) setProjects(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleArchiveToggle = async (project: any, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const newStatus = project.status === 'archived' ? 'active' : 'archived';

            const headers: any = {};
            if (company_id) headers['x-organization-id'] = company_id;

            await authClient.$fetch(`http://10.0.0.150:3000/projects/${project.id}`, {
                method: 'PUT',
                body: { status: newStatus },
                headers
            });
            loadProjects();
        } catch (error) {
            console.error('Failed to update project status:', error);
        }
    };

    return (
        <div className="space-y-12 animate-slide-up pb-10">
            {/* HEADER */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-2">
                        Projetos
                    </h2>
                    <p className="text-sm text-zinc-500 max-w-2xl">
                        Gerencie todos os projetos dessa organização. Projetos englobam tarefas, kanbans e dashboards.
                    </p>
                </div>
                <Button onClick={() => setIsCreating(true)} className="gap-2 shrink-0">
                    <Plus size={16} />
                    Novo Projeto
                </Button>
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="w-full flex justify-center py-10">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">
                        Nenhum projeto cadastrado nesta organização. Crie o primeiro!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map(project => (
                            <div key={project.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col justify-between group">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                            <Briefcase size={24} className="text-zinc-400" />
                                        </div>
                                        <div className="text-xs  tracking-wider font-semibold px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                            {project.status === 'archived' ? 'Arquivado' : 'Ativo'}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{project.name}</h3>
                                    <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
                                        {project.description || 'Sem descrição.'}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 pt-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => handleArchiveToggle(project, e)}
                                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 gap-2"
                                    >
                                        {project.status === 'archived' ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                                        {project.status === 'archived' ? 'Restaurar' : 'Arquivar'}
                                    </Button>

                                    <Button
                                        size="sm"
                                        onClick={() => setEditingProject(project)}
                                        className="gap-2"
                                    >
                                        Editar
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {(isCreating || editingProject) && (
                <EditProjectModal
                    project={editingProject}
                    onClose={() => {
                        setIsCreating(false);
                        setEditingProject(null);
                    }}
                    onSuccess={() => {
                        setIsCreating(false);
                        setEditingProject(null);
                        loadProjects();
                    }}
                />
            )}
        </div>
    );
}
