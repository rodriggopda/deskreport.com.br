import { useState, useEffect } from 'react';
import { Button, Dialog } from '../../components/ui';
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
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);

    // GitHub Integration
    const [showGithub, setShowGithub] = useState(false);
    const [githubToken, setGithubToken] = useState('');
    const [githubOwner, setGithubOwner] = useState('');
    const [githubRepo, setGithubRepo] = useState('');
    const [selectedRepos, setSelectedRepos] = useState<{ owner: string, repo: string }[]>([]);
    const [githubRepos, setGithubRepos] = useState<any[]>([]);
    const [isManual, setIsManual] = useState(false);
    const [fetchingRepos, setFetchingRepos] = useState(false);
    const [testingConnection, setTestingConnection] = useState(false);
    const [isSyncingInitial, setIsSyncingInitial] = useState(false);

    const { fetchProjects, teams, fetchTeams } = useTenantStore();
    const { company_id } = useTenant();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            if (event.data.type === 'GITHUB_AUTH_SUCCESS') {
                if (event.data.repos) setGithubRepos(event.data.repos);
                if (event.data.accessToken) setGithubToken(event.data.accessToken);
                setShowGithub(true);
                // Trigger a refresh of integration data
                if (project?.id) fetchGitHubIntegration();
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [project]);

    const fetchGitHubIntegration = async () => {
        try {
            const { data } = await authClient.$fetch<{ accessToken: string, githubOwner: string, githubRepo: string, repos: any[] }>(`http://10.0.0.150:3000/github/integration/${project.id}`);
            if (data) {
                setGithubToken(data.accessToken || '');
                setGithubOwner(data.githubOwner || '');
                setGithubRepo(data.githubRepo || '');
                setSelectedRepos(data.repos || []);
                setShowGithub(true);

                // If we have a token but no repos list, fetch it
                if (data.accessToken) {
                    fetchRepos(project.id);
                }
            }
        } catch (e) { /* ignore */ }
    };

    const fetchRepos = async (pId: string) => {
        setFetchingRepos(true);
        try {
            const { data } = await authClient.$fetch<any[]>(`http://10.0.0.150:3000/github/repos/${pId}`);
            if (data) setGithubRepos(data);
        } catch (e) { console.error(e); }
        finally { setFetchingRepos(false); }
    };

    const handleGithubConnect = async () => {
        if (!project?.id) {
            alert('Por favor, salve o projeto antes de conectar ao GitHub');
            return;
        }
        try {
            const { data } = await authClient.$fetch<{ url: string }>(`http://10.0.0.150:3000/github/auth-url/${project.id}`);
            if (data?.url) {
                const width = 600, height = 700;
                const left = window.screenX + (window.outerWidth - width) / 2;
                const top = window.screenY + (window.outerHeight - height) / 2;
                window.open(data.url, 'github-auth', `width=${width},height=${height},left=${left},top=${top}`);
            }
        } catch (e) {
            alert('Erro ao iniciar conexão com GitHub');
        }
    };

    useEffect(() => {
        if (company_id) {
            fetchTeams(company_id);
        }
    }, [company_id]);

    useEffect(() => {
        if (project) {
            setName(project.name || '');
            setDescription(project.description || '');
            setStatus(project.status || 'active');
            setSelectedTeamIds(project.teams?.map((t: any) => t.teamId) || []);
            fetchGitHubIntegration();
        } else {
            setName('');
            setDescription('');
            setStatus('active');
            setSelectedTeamIds([]);
            setGithubToken('');
            setGithubOwner('');
            setGithubRepo('');
            setSelectedRepos([]);
            setGithubRepos([]);
            setShowGithub(false);
            setIsManual(false);
        }
    }, [project]);

    const toggleRepo = (owner: string, repoName: string) => {
        setSelectedRepos(prev => {
            const exists = prev.find((r: any) => r.owner === owner && r.repo === repoName);
            if (exists) {
                return prev.filter((r: any) => !(r.owner === owner && r.repo === repoName));
            } else {
                return [...prev, { owner, repo: repoName }];
            }
        });
    };

    const toggleTeam = (teamId: string) => {
        setSelectedTeamIds(prev =>
            prev.includes(teamId)
                ? prev.filter(id => id !== teamId)
                : [...prev, teamId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        const headers: any = {};
        if (company_id) {
            headers['x-organization-id'] = company_id;
        }

        try {
            const payload = { name, description, status, teamIds: selectedTeamIds };

            let savedProject: any;
            if (project) {
                const { data } = await authClient.$fetch<any>(`http://10.0.0.150:3000/projects/${project.id}`, {
                    method: 'PUT',
                    body: payload,
                    headers
                });
                savedProject = data;
            } else {
                const { data } = await authClient.$fetch<any>('http://10.0.0.150:3000/projects', {
                    method: 'POST',
                    body: payload,
                    headers
                });
                savedProject = data;
            }

            if (showGithub && githubToken) {
                await authClient.$fetch(`http://10.0.0.150:3000/github/integration/${savedProject.id}`, {
                    method: 'POST',
                    body: {
                        accessToken: githubToken,
                        githubOwner,
                        githubRepo,
                        repos: selectedRepos
                    },
                    headers
                });

                // Trigger initial sync automatically after saving
                setIsSyncingInitial(true);
                try {
                    await authClient.$fetch(`http://10.0.0.150:3000/github/sync/${savedProject.id}`, {
                        method: 'POST',
                        headers
                    });
                } catch (e) {
                    console.error('Initial sync failed:', e);
                } finally {
                    setIsSyncingInitial(false);
                }
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
        <Dialog
            isOpen={true}
            onClose={onClose}
            title={project ? 'Editar Projeto' : 'Novo Projeto'}
            maxWidth="md"
            footer={(
                <>
                    <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" form="project-form" className="flex-1" disabled={loading || isSyncingInitial}>
                        {isSyncingInitial ? 'Sincronizando Tarefas...' : (loading ? 'Salvando...' : (project ? 'Salvar Alterações' : 'Criar Projeto'))}
                    </Button>
                </>
            )}
        >
            <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black  text-zinc-400">Nome do Projeto</label>
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
                        <label className="text-[10px] font-black  text-zinc-400">Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descreva o propósito deste projeto..."
                            className="w-full min-h-[100px] resize-none bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black  text-zinc-400">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all font-medium"
                        >
                            <option value="active">Ativo</option>
                            <option value="archived">Arquivado</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-white/[0.05]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-zinc-900 dark:text-white">Integração com GitHub</div>
                                <div className="text-[10px] text-zinc-500">Sincronize Issues do GitHub automaticamente</div>
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 text-[10px] font-bold"
                            onClick={() => setShowGithub(!showGithub)}
                        >
                            {showGithub ? 'Remover' : 'Configurar'}
                        </Button>
                    </div>

                    {showGithub && (
                        <div className="space-y-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/[0.05] animate-in slide-in-from-top-2 duration-200">
                            {!githubToken ? (
                                <Button
                                    type="button"
                                    className="w-full h-10 gap-2 font-bold bg-zinc-900 border-zinc-800 hover:bg-black"
                                    onClick={handleGithubConnect}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                    Autorizar com GitHub
                                </Button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            GitHub Conectado
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => { setGithubToken(''); setGithubRepos([]); }}
                                            className="text-[10px] font-bold text-zinc-400 hover:text-red-500 transition-colors"
                                        >
                                            Desconectar
                                        </button>
                                    </div>

                                    {!isManual ? (
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-zinc-400">Selecionar Repositórios ({selectedRepos.length})</label>
                                            <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar border border-zinc-100 dark:border-zinc-800 rounded-lg p-2 bg-white dark:bg-zinc-900/50">
                                                {fetchingRepos ? (
                                                    <div className="text-[10px] text-zinc-500 italic p-2 whitespace-nowrap overflow-hidden">Buscando repositórios...</div>
                                                ) : (
                                                    githubRepos.map(repo => {
                                                        const isSelected = selectedRepos.some((r: any) => r.owner === repo.owner && r.repo === repo.name);
                                                        return (
                                                            <div
                                                                key={repo.id}
                                                                onClick={() => toggleRepo(repo.owner, repo.name)}
                                                                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                                                            >
                                                                <div className="flex flex-col min-w-0">
                                                                    <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 truncate">{repo.name}</span>
                                                                    <span className="text-[9px] text-zinc-500 truncate">{repo.owner}</span>
                                                                </div>
                                                                <div className={`shrink-0 w-3.5 h-3.5 rounded border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-zinc-300 dark:border-zinc-700'}`}>
                                                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                                {githubRepos.length === 0 && !fetchingRepos && (
                                                    <div className="text-[10px] text-zinc-500 italic p-2">Nenhum repositório encontrado.</div>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setIsManual(true)}
                                                className="text-[9px] text-blue-500 font-bold hover:underline"
                                            >
                                                Digitar manualmente
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-zinc-400">Dono (User/Org)</label>
                                                    <input
                                                        type="text"
                                                        value={githubOwner}
                                                        onChange={(e) => setGithubOwner(e.target.value)}
                                                        placeholder="ex: facebook"
                                                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 transition-all font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-zinc-400">Repositório</label>
                                                    <input
                                                        type="text"
                                                        value={githubRepo}
                                                        onChange={(e) => setGithubRepo(e.target.value)}
                                                        placeholder="ex: react"
                                                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 transition-all font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setIsManual(false)}
                                                className="text-[9px] text-blue-500 font-bold hover:underline"
                                            >
                                                Voltar para lista
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const advanced = document.getElementById('github-advanced');
                                        if (advanced) advanced.classList.toggle('hidden');
                                    }}
                                    className="text-[9px] text-zinc-500 font-bold hover:text-zinc-700"
                                >
                                    Configurações Avançadas (PAT)
                                </button>
                                <div id="github-advanced" className="hidden mt-2 space-y-4 border-t border-zinc-100 dark:border-white/[0.05] pt-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-zinc-400">PAT (Personal Access Token)</label>
                                        <input
                                            type="password"
                                            value={githubToken}
                                            onChange={(e) => setGithubToken(e.target.value)}
                                            placeholder="ghp_xxxxxxxxxxxx"
                                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 transition-all font-medium"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="w-full h-8 text-[10px] font-bold border border-zinc-200 dark:border-zinc-800"
                                        disabled={!githubToken || testingConnection}
                                        onClick={async () => {
                                            setTestingConnection(true);
                                            try {
                                                const { data } = await authClient.$fetch<any>('http://10.0.0.150:3000/github/test', {
                                                    method: 'POST',
                                                    body: { accessToken: githubToken }
                                                });
                                                if (data?.success) alert(`Conectado como: ${data.user}`);
                                                else alert('Erro na conexão: ' + (data?.error || 'Token inválido'));
                                            } catch (e) {
                                                alert('Falha ao testar conexão');
                                            } finally {
                                                setTestingConnection(false);
                                            }
                                        }}
                                    >
                                        {testingConnection ? 'Testando...' : 'Testar Conexão'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Equipes Vinculadas ({selectedTeamIds.length})</label>
                    <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                        {teams.map(team => {
                            const isSelected = selectedTeamIds.includes(team.id);
                            return (
                                <div
                                    key={team.id}
                                    onClick={() => toggleTeam(team.id)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isSelected
                                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                                        : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700'
                                        }`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{team.name}</div>
                                        <div className="text-[10px] text-zinc-500 truncate">{team._count?.members || 0} membros</div>
                                    </div>
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-zinc-300 dark:border-zinc-700'
                                        }`}>
                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                </div>
                            );
                        })}
                        {teams.length === 0 && (
                            <div className="col-span-2 text-[10px] text-zinc-400 italic">Nenhuma equipe cadastrada.</div>
                        )}
                    </div>
                </div>
            </form>
        </Dialog>
    );
}
