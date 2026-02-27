import { useEffect, useState } from 'react';
import { Plus, Users, Building, MoreVertical, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { authClient } from '../../../lib/auth-client';
import { useNavigate } from 'react-router-dom';
import { EditOrganizationModal } from './edit-organization-modal';

export function OrganizationsHub() {
    const [organizations, setOrganizations] = useState<any[]>([]);
    const [editingOrg, setEditingOrg] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrganizations();
    }, []);

    const loadOrganizations = async () => {
        setLoading(true);
        try {
            const { data } = await authClient.organization.list();
            if (data) setOrganizations(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSetActive = async (org: any) => {
        try {
            await authClient.organization.setActive({ organizationId: org.id });
            navigate(`/${org.id}/resume`);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="space-y-12 animate-slide-up pb-10">
            {/* HEADER */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-2">
                        Organizações
                    </h2>
                    <p className="text-sm text-zinc-500 max-w-2xl">
                        Gerencie todas as organizações que você faz parte, alterne entre os contextos ou crie novos espaços de trabalho para novos negócios.
                    </p>
                </div>
                <Button onClick={() => navigate('/setup-organization')} className="gap-2 shrink-0">
                    <Plus size={16} />
                    Nova Organização
                </Button>
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="w-full flex justify-center py-10">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : organizations.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">
                        Nenhuma organização encontrada.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {organizations.map(org => (
                            <div key={org.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col justify-between group">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                            <Building size={24} className="text-zinc-400" />
                                        </div>
                                        {/* Fake menu to look good */}
                                        <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>

                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{org.name}</h3>
                                    <p className="text-[10px] text-zinc-500 font-mono mt-1 opacity-50 truncate">{org.id}</p>
                                </div>

                                <div className="mt-8 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                        <Users size={16} />
                                        <span>Membro</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingOrg(org);
                                            }}
                                            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleSetActive(org)}
                                            className="gap-2"
                                        >
                                            Acessar <ArrowRight size={14} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {editingOrg && (
                <EditOrganizationModal
                    organization={editingOrg}
                    onClose={() => setEditingOrg(null)}
                    onSuccess={() => {
                        setEditingOrg(null);
                        loadOrganizations();
                    }}
                />
            )}
        </div>
    );
}
