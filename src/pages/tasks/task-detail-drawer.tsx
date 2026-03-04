import {
    X, History, Users2,
    ChevronRight, Pin, Maximize2, Paperclip,
    MessageSquare, Plus,
    User, Target, Layers, Hash, Activity,
    Pencil, Check
} from 'lucide-react';
import { TaskCardProps, PRIORITY_CONFIG, STATUS_CONFIG } from './tasks-data';
import { useState, useEffect } from 'react';
import { RichEditor } from '../../components/ui/rich-editor';
import { Button, Dialog } from '../../components/ui';
import { useTenantStore } from '../../store';
import { useTaskStore } from './use-task-store';

interface TaskDetailDrawerProps {
    task: TaskCardProps | null;
    isOpen: boolean;
    onClose: () => void;
    defaultProject?: string;
}

import { useParams } from 'react-router-dom';

export function TaskDetailDrawer({ task, isOpen, onClose, defaultProject }: TaskDetailDrawerProps) {
    const [displayTask, setDisplayTask] = useState<TaskCardProps | null>(null);
    const [comment, setComment] = useState('');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');

    const { updateTask, addTask } = useTaskStore();
    const { projects, teams, fetchTeams, members, fetchMembers } = useTenantStore();

    const [isAddingAssignee, setIsAddingAssignee] = useState(false);

    const { company_id } = useParams();

    useEffect(() => {
        if (isOpen && company_id) {
            if (teams.length === 0) fetchTeams(company_id);
            if (members.length === 0) fetchMembers(company_id);
        }
    }, [isOpen, teams.length, members.length, company_id, fetchTeams, fetchMembers]);

    useEffect(() => {
        if (task) {
            setDisplayTask(task);
            setEditedTitle(task.title);
            setEditedDescription(task.description || '');
            setIsEditingTitle(false);
            setIsEditingDescription(false);
        } else if (isOpen) {
            // New Task mode
            const sanitizedProject = (defaultProject && defaultProject !== 'undefined') ? defaultProject : 'deskreport';
            const newTaskTemplate: TaskCardProps = {
                id: 'temp-' + Date.now(),
                title: '',
                project: sanitizedProject,
                status: 'todo',
                priority: 'medium',
                createdAt: new Date().toISOString(),
                assigneeIds: [],
                assignees: [],
                tags: []
            };
            setDisplayTask(newTaskTemplate);
            setEditedTitle('');
            setEditedDescription('');
            setIsEditingTitle(true);
            setIsEditingDescription(false);
        }
    }, [task, isOpen, defaultProject]);

    const priority = displayTask ? PRIORITY_CONFIG[displayTask.priority] : null;
    const status = displayTask ? STATUS_CONFIG[displayTask.status] : null;

    const projectName = projects.find(p => p.id === displayTask?.project)?.name || displayTask?.project;

    const handleTitleSubmit = async () => {
        if (displayTask && editedTitle.trim() && editedTitle !== displayTask.title) {
            if (task) {
                await updateTask(displayTask.id, { title: editedTitle });
            }
            setDisplayTask({ ...displayTask, title: editedTitle });
        }
        setIsEditingTitle(false);
    };

    const handleDescriptionSubmit = async () => {
        if (displayTask && editedDescription !== displayTask.description) {
            if (task) {
                await updateTask(displayTask.id, { description: editedDescription });
            }
            setDisplayTask({ ...displayTask, description: editedDescription });
        }
        setIsEditingDescription(false);
    };
    const handlePropertyUpdate = async (key: keyof TaskCardProps, value: any) => {
        if (!displayTask) return;

        const updatedTask = { ...displayTask, [key]: value };

        // If updating assigneeIds, we also need to update the assignees display list
        if (key === 'assigneeIds') {
            const newAssigneeIds = value as string[];
            updatedTask.assignees = members
                .filter(m => newAssigneeIds.includes(m.user.id))
                .map(m => ({ name: m.user.name, avatar: m.user.image || '' }));
        }

        setDisplayTask(updatedTask);

        if (task) {
            await updateTask(displayTask.id, { [key]: value });
        }
    };

    const handleAddAssignee = (userId: string) => {
        if (!displayTask) return;
        const currentIds = displayTask.assigneeIds || [];
        if (currentIds.includes(userId)) {
            setIsAddingAssignee(false);
            return;
        }
        handlePropertyUpdate('assigneeIds', [...currentIds, userId]);
        setIsAddingAssignee(false);
    };

    const handleRemoveAssignee = (userId: string) => {
        if (!displayTask) return;
        const currentIds = displayTask.assigneeIds || [];
        handlePropertyUpdate('assigneeIds', currentIds.filter(id => id !== userId));
    };

    const handleAddTag = () => {
        if (!displayTask) return;
        const newTag = { label: 'Nova Etiqueta', color: 'text-blue-500 border-blue-500/20 bg-blue-500/10' };
        const currentTags = displayTask.tags || [];
        handlePropertyUpdate('tags', [...currentTags, newTag]);
    };

    const handleRemoveTag = (label: string) => {
        if (!displayTask) return;
        const currentTags = displayTask.tags || [];
        handlePropertyUpdate('tags', currentTags.filter(t => t.label !== label));
    };

    const handleCreateTask = async () => {
        if (!displayTask || !editedTitle.trim()) return;

        const payload = {
            title: editedTitle,
            description: editedDescription,
            project: (displayTask.project && displayTask.project !== 'undefined') ? displayTask.project : 'deskreport',
            status: displayTask.status,
            priority: displayTask.priority,
            assigneeIds: displayTask.assigneeIds || [],
            teamId: displayTask.teamId,
            tags: displayTask.tags || []
        };

        await addTask(payload);
        onClose();
    };

    return (
        <Dialog isOpen={isOpen} onClose={onClose} maxWidth="7xl" hideHeader padded={false} scrollableBody={false}>
            {displayTask && status && priority && (
                <div className="flex flex-col h-[calc(100vh-200px)] bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-300 font-sans antialiased overflow-hidden">

                    {/* 1. TOP BAR: Navigation & Meta Actions */}
                    <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/60 bg-white/50 dark:bg-[#0c0d0e]/50 backdrop-blur-md shrink-0">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-500 transition-colors">
                            <Layers size={14} className="text-zinc-600" />
                            <span className="hover:text-zinc-200 cursor-pointer transition-colors px-1">{projectName}</span>
                            <ChevronRight size={12} className="text-zinc-700" />
                            <Hash size={12} className="text-zinc-700" />
                            <span className="text-zinc-400 font-bold px-1">{task ? displayTask.shortId : 'Nova'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {!task && (
                                <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-8 px-4"
                                    onClick={handleCreateTask}
                                    disabled={!editedTitle.trim()}
                                >
                                    Criar Tarefa
                                </Button>
                            )}
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-200">
                                    <Pin size={15} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-200">
                                    <Maximize2 size={15} />
                                </Button>
                            </div>
                            <div className="w-px h-4 bg-zinc-200 dark:bg-white/[0.08] mx-1" />
                            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-zinc-500 hover:text-red-400">
                                <X size={18} />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 flex overflow-hidden">

                        {/* 2. MAIN WORKSPACE (LEFT) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="max-w-[800px] mx-auto px-12 py-8 space-y-6">

                                {/* TITLE & TOP BADGES */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold border ${status.color} bg-opacity-10`}>
                                            {status.label}
                                        </div>
                                        <div className="h-4 w-px bg-white/[0.08]" />
                                        <div className="flex items-center -space-x-2">
                                            {displayTask.assignees?.map((a, i) => (
                                                <img key={i} src={a.avatar} className="w-5 h-5 rounded-full border border-white dark:border-zinc-900 shadow-sm" title={a.name} />
                                            ))}
                                            {(!displayTask.assignees || displayTask.assignees.length === 0) && (
                                                <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                                                    <User size={10} className="text-zinc-500" />
                                                </div>
                                            )}
                                            <span className="text-zinc-600 dark:text-zinc-300 ml-4 text-[11px] font-medium">
                                                {displayTask.assignees && displayTask.assignees.length > 0
                                                    ? displayTask.assignees.length === 1 ? displayTask.assignees[0].name : `${displayTask.assignees.length} responsáveis`
                                                    : 'Sem responsável'}
                                            </span>
                                        </div>
                                    </div>

                                    {isEditingTitle ? (
                                        <input
                                            autoFocus
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                            onBlur={handleTitleSubmit}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleTitleSubmit();
                                                if (e.key === 'Escape') {
                                                    setEditedTitle(displayTask.title || '');
                                                    setIsEditingTitle(false);
                                                }
                                            }}
                                            className="w-full text-3xl font-bold tracking-tight text-zinc-900 dark:text-white bg-zinc-50 dark:bg-white/[0.05] border-none outline-none ring-1 ring-blue-500/50 rounded px-2 py-1 -ml-2"
                                        />
                                    ) : (
                                        <h1
                                            onClick={() => setIsEditingTitle(true)}
                                            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white selection:bg-blue-500/30 cursor-text hover:bg-zinc-50 dark:hover:bg-white/[0.02] rounded transition-colors -ml-2 px-2 py-1 outline-none"
                                        >
                                            {displayTask.title || <span className="text-zinc-400 italic font-normal">Sem título</span>}
                                        </h1>
                                    )}
                                </div>

                                {/* DESCRIPTION ZONE */}
                                <div className="space-y-4">
                                    <div className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={`h-7 w-7 transition-colors ${isEditingDescription ? 'text-blue-400 bg-blue-400/10' : 'text-zinc-500 hover:text-zinc-200'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isEditingDescription) handleDescriptionSubmit();
                                                else setIsEditingDescription(true);
                                            }}
                                        >
                                            {isEditingDescription ? <Check size={14} /> : <Pencil size={14} />}
                                        </Button>
                                    </div>

                                    <div className={`prose dark:prose-invert prose-zinc max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed min-h-[40px] rounded-lg transition-all ${isEditingDescription ? 'bg-zinc-50 dark:bg-[#0c0d0e]/50 ring-1 ring-zinc-200 dark:ring-white/[0.06] p-4' : 'hover:bg-zinc-50 dark:hover:bg-white/[0.01] p-2 cursor-pointer'}`}
                                        onClick={() => !isEditingDescription && setIsEditingDescription(true)}>

                                        {isEditingDescription ? (
                                            <div className="space-y-4">
                                                <RichEditor
                                                    content={editedDescription}
                                                    onChange={setEditedDescription}
                                                    placeholder="Descreva o que deve ser feito..."
                                                    minHeight="200px"
                                                />
                                                <div className="flex justify-end gap-2 border-t border-zinc-200 dark:border-white/[0.06] pt-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditedDescription(displayTask.description || '');
                                                            setIsEditingDescription(false);
                                                        }}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="bg-blue-600 hover:bg-blue-500 text-white px-4"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDescriptionSubmit();
                                                        }}
                                                    >
                                                        Salvar
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm">
                                                {displayTask.description ? (
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: displayTask.description }}
                                                        className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-900/50"
                                                    />
                                                ) : (
                                                    <p className="text-zinc-500 italic">Nenhuma descrição informada. Clique para adicionar.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* ACTIVITY / COMMENTS */}
                                <div className="space-y-8 pt-10 border-t border-zinc-200 dark:border-white/[0.06]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Atividades</h3>
                                            <div className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black">2</div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-[10px] font-bold text-zinc-500">Filtrar por: Todos</Button>
                                    </div>

                                    {/* Timeline Items */}
                                    <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <img src={displayTask.assignees?.[0]?.avatar} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-white/[0.08]" />
                                            <div className="flex-1 space-y-1.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-zinc-900 dark:text-white leading-none">{displayTask.assignees?.[0]?.name}</span>
                                                    <span className="text-[10px] text-zinc-500 font-medium">há 2 horas</span>
                                                </div>
                                                <div className="text-sm text-zinc-700 dark:text-zinc-400 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/[0.04] p-3 rounded-xl rounded-tl-none">
                                                    Iniciei a implementação básica do layout seguindo o design do Linear.
                                                </div>
                                            </div>
                                        </div>

                                        {/* Activity feed type */}
                                        <div className="flex items-center gap-4 pl-10 text-zinc-500">
                                            <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-800">
                                                <Activity size={10} className="text-zinc-500" />
                                            </div>
                                            <p className="text-[11px] italic">
                                                <span className="font-bold text-zinc-700 dark:text-zinc-400">{displayTask.assignees?.[0]?.name}</span> atualizou o status para <span className="text-blue-600 dark:text-blue-400 font-bold">Em Andamento</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Reply Box */}
                                    <div className="flex gap-4 group focus-within:ring-1 focus-within:ring-blue-500/20 rounded-2xl p-2 transition-all">
                                        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                                            <User size={14} className="text-zinc-500 dark:text-zinc-600" />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="bg-white dark:bg-[#0c0d0e] border border-zinc-200 dark:border-white/[0.06] rounded-xl overflow-hidden focus-within:border-blue-500/50 transition-colors">
                                                <RichEditor
                                                    content={comment}
                                                    onChange={setComment}
                                                    placeholder="Escreva um comentário..."
                                                    minHeight="40px"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500"><Paperclip size={14} /></Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500"><MessageSquare size={14} /></Button>
                                                </div>
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-8 px-4">Comentar</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. PROPERTIES SIDEBAR (RIGHT) */}
                        <div className="w-[340px] shrink-0 p-4 h-full flex flex-col">
                            <div className="flex-1 rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.04] overflow-y-auto px-6 py-8 custom-scrollbar">
                                <div className="space-y-8">
                                    {/* ... properties ... */}

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-1">
                                            {/* Status Property */}
                                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.03] transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <History size={13} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                                    <span className="text-[10px] font-black text-zinc-400">Estado</span>
                                                </div>
                                                <select
                                                    value={displayTask.status}
                                                    onChange={(e) => handlePropertyUpdate('status', e.target.value)}
                                                    className="bg-transparent text-[11px] font-bold text-zinc-700 dark:text-zinc-300 outline-none cursor-pointer hover:text-blue-500 transition-colors text-right"
                                                >
                                                    {Object.entries(STATUS_CONFIG).map(([id, config]) => (
                                                        <option key={id} value={id} className="bg-white dark:bg-[#0c0d0e] text-zinc-900 dark:text-zinc-100">{config.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Priority Property */}
                                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.03] transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <Activity size={13} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                                    <span className="text-[10px] font-black text-zinc-400">Prioridade</span>
                                                </div>
                                                <select
                                                    value={displayTask.priority}
                                                    onChange={(e) => handlePropertyUpdate('priority', e.target.value)}
                                                    className={`bg-transparent text-[11px] font-bold ${priority?.color} outline-none cursor-pointer hover:brightness-110 transition-colors text-right`}
                                                >
                                                    {Object.entries(PRIORITY_CONFIG).map(([id, config]) => (
                                                        <option key={id} value={id} className={`bg-white dark:bg-[#0c0d0e] ${config.color.split(' ')[1] || 'text-zinc-500'}`}>{config.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Project Property */}
                                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.03] transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <Target size={13} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                                    <span className="text-[10px] font-black text-zinc-400">Projeto</span>
                                                </div>
                                                <select
                                                    value={displayTask.project}
                                                    onChange={(e) => handlePropertyUpdate('project', e.target.value)}
                                                    className="bg-transparent text-[11px] font-bold text-zinc-500 outline-none cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors text-right max-w-[150px]"
                                                >
                                                    {projects.filter(p => p.id !== 'all').map(p => (
                                                        <option key={p.id} value={p.id} className="bg-white dark:bg-[#0c0d0e] text-zinc-900 dark:text-zinc-100">{p.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Team Property */}
                                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.03] transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <Users2 size={13} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                                    <span className="text-[10px] font-black text-zinc-400">Equipe</span>
                                                </div>
                                                <select
                                                    value={displayTask.teamId || ''}
                                                    onChange={(e) => handlePropertyUpdate('teamId', e.target.value || null)}
                                                    className="bg-transparent text-[11px] font-bold text-zinc-700 dark:text-zinc-300 outline-none cursor-pointer hover:text-blue-500 transition-colors text-right max-w-[150px]"
                                                >
                                                    <option value="" className="bg-white dark:bg-[#0c0d0e] text-zinc-500">Não vinculada</option>
                                                    {teams.map(t => (
                                                        <option key={t.id} value={t.id} className="bg-white dark:bg-[#0c0d0e] text-zinc-900 dark:text-zinc-100">{t.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Users2 size={13} className="text-zinc-600" />
                                                    <span className="text-[10px] font-black text-zinc-400">Responsáveis</span>
                                                </div>
                                                <div className="relative">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={`h-5 w-5 transition-colors ${isAddingAssignee ? 'text-blue-500' : 'text-zinc-400 hover:text-white'}`}
                                                        onClick={() => setIsAddingAssignee(!isAddingAssignee)}
                                                    >
                                                        <Plus size={12} />
                                                    </Button>

                                                    {isAddingAssignee && (
                                                        <div className="absolute right-0 top-6 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                                            <div className="p-1 max-h-48 overflow-y-auto custom-scrollbar">
                                                                {members
                                                                    .filter(m => !(displayTask.assigneeIds || []).includes(m.user.id))
                                                                    .map(m => (
                                                                        <div
                                                                            key={m.user.id}
                                                                            className="flex items-center gap-2 p-2 hover:bg-zinc-50 dark:hover:bg-white/[0.05] cursor-pointer rounded transition-colors"
                                                                            onClick={() => handleAddAssignee(m.user.id)}
                                                                        >
                                                                            <img src={m.user.image} className="w-5 h-5 rounded-full" />
                                                                            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 truncate">{m.user.name}</span>
                                                                        </div>
                                                                    ))}
                                                                {members.length === 0 && <div className="p-2 text-[10px] italic text-zinc-500 text-center">Nenhum membro</div>}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                {(displayTask.assigneeIds || []).map((userId, i) => {
                                                    const member = members.find(m => m.user.id === userId);
                                                    const name = member?.user?.name || displayTask.assignees?.[i]?.name || 'Usuário';
                                                    const avatar = member?.user?.image || displayTask.assignees?.[i]?.avatar || '';

                                                    return (
                                                        <div key={userId} className="flex items-center justify-between group/user cursor-pointer p-1 rounded hover:bg-white/[0.05] transition-colors">
                                                            <div className="flex items-center gap-2">
                                                                <img src={avatar} className="w-5 h-5 rounded-full" />
                                                                <span className="text-[11px] font-bold text-zinc-400 group-hover/user:text-zinc-200 transition-colors">{name}</span>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-4 w-4 opacity-0 group-hover/user:opacity-100 text-zinc-500 hover:text-red-400"
                                                                onClick={() => handleRemoveAssignee(userId)}
                                                            >
                                                                <X size={10} />
                                                            </Button>
                                                        </div>
                                                    );
                                                })}
                                                {(!displayTask.assigneeIds || displayTask.assigneeIds.length === 0) && (
                                                    <div className="text-[10px] italic text-zinc-500 pl-6">Nenhum responsável</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-zinc-200 dark:bg-white/[0.06]" />

                                    {/* Tags Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between px-1">
                                            <span className="text-[10px] font-black text-zinc-400">Etiquetas</span>
                                            <Button variant="ghost" size="icon" className="h-5 w-5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Plus size={12} /></Button>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {displayTask.tags?.map(tag => (
                                                <div
                                                    key={tag.label}
                                                    className={`group/tag relative px-2 py-0.5 rounded text-[10px] font-bold border ${tag.color} bg-opacity-5 hover:bg-opacity-10 cursor-pointer transition-all flex items-center gap-1`}
                                                >
                                                    {tag.label}
                                                    <X
                                                        size={10}
                                                        className="opacity-0 group-hover/tag:opacity-100 hover:text-red-500 transition-opacity"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveTag(tag.label);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                            <Button
                                                variant="ghost"
                                                className="h-6 px-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-600 border border-dashed border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-blue-500 transition-colors"
                                                onClick={handleAddTag}
                                            >
                                                + Add Label
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="h-px bg-zinc-200 dark:bg-white/[0.06]" />

                                    {/* Timestamps */}
                                    <div className="space-y-3 px-1 text-[10px] font-black text-zinc-400">
                                        <div className="flex justify-between items-center">
                                            <span>Criado</span>
                                            <span className="text-zinc-500">há 24 dias</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Atualizado</span>
                                            <span className="text-zinc-400">há 12 minutos</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </Dialog>
    );
}
