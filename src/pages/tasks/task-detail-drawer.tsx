import { X, History, MoreHorizontal, Settings, CheckCircle2 } from 'lucide-react';
import { TaskCardProps, PRIORITY_CONFIG, STATUS_CONFIG } from './tasks-data';
import { useState, useEffect } from 'react';
import { RichEditor } from '../../components/ui/rich-editor';
import { Button, Drawer } from '../../components/ui';
import { useTenantStore } from '../../store';

interface TaskDetailDrawerProps {
    task: TaskCardProps | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: () => void;
}

export function TaskDetailDrawer({ task, isOpen, onClose, onEdit }: TaskDetailDrawerProps) {
    const [displayTask, setDisplayTask] = useState<TaskCardProps | null>(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (task) {
            setDisplayTask(task);
        }
    }, [task]);

    const priority = displayTask ? PRIORITY_CONFIG[displayTask.priority] : null;
    const status = displayTask ? STATUS_CONFIG[displayTask.status] : null;

    const { projects } = useTenantStore();
    const projectName = projects.find(p => p.id === displayTask?.project)?.name || displayTask?.project;

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            {displayTask && status && priority && (
                <>
                    {/* 1. Header Area: Title and Top Actions */}
                    <div className='px-8 pt-8 pb-4 shrink-0'>
                        <div className='flex items-start justify-between gap-6 mb-4'>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-bold leading-tight group flex items-center gap-3'>
                                    {displayTask.title}
                                    <span className='text-zinc-400 dark:text-zinc-600 font-medium text-xl'>
                                        #{String(displayTask.shortId || 0).padStart(3, '0')}
                                    </span>
                                </h2>
                            </div>
                            <div className='flex items-center gap-1.5 shrink-0'>
                                <Button size="sm" onClick={onEdit}>
                                    Editar
                                </Button>
                                <Button size="icon" variant="ghost"><MoreHorizontal size={18} /></Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={onClose}
                                    className='text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
                                >
                                    <X size={20} />
                                </Button>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 mb-6'>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${status.color}`}>
                                <CheckCircle2 size={12} /> {status.label}
                            </span>
                            <span className='text-xs text-zinc-500 dark:text-zinc-400 font-medium'>
                                <span className='font-bold text-zinc-800 dark:text-zinc-200'>{displayTask.assignee?.name || 'Sistema'}</span> criou esta tarefa em {new Date(displayTask.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className='h-px bg-zinc-100 dark:bg-zinc-800/50 w-full' />
                    </div>

                    {/* 2. Main Layout Compartments */}
                    <div className='flex-1 flex overflow-hidden'>

                        {/* Left Column: Timeline & Discussion (Hierarchy Reference: GitHub) */}
                        <div className='flex-1 overflow-y-auto px-8 py-4 space-y-8 selection:bg-blue-100 selection:text-blue-900'>

                            {/* Initial Description Box */}
                            <div className='border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-[#121214]'>
                                <div className='bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between'>
                                    <span className='text-[11px] font-bold text-zinc-500'>
                                        Descrição da tarefa
                                    </span>
                                    <Button size="icon" variant="ghost" className='h-6 w-6'><MoreHorizontal size={14} /></Button>
                                </div>
                                <div className='p-6 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal'>
                                    <p>Nas etiquetas deverá ter etiquetas do sistema e etiquetas pessoais.</p>
                                    <p className='mt-4 text-zinc-400 italic'>Nenhuma descrição adicional informada.</p>
                                </div>
                            </div>

                            {/* Timeline Hierarchy */}
                            <div className='relative pl-10 space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-zinc-100 dark:before:bg-zinc-800'>
                                <div className='relative flex items-center gap-3'>
                                    <div className='absolute -left-8 w-4 h-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center'>
                                        <History size={10} className='text-zinc-400' />
                                    </div>
                                    <img src={displayTask.assignee?.avatar} className='w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-800' />
                                    <p className='text-xs text-zinc-500'>
                                        <span className='font-bold text-zinc-800 dark:text-zinc-200'>rodriggopda</span> adicionou esta tarefa ao projeto <span className='font-bold text-zinc-900 dark:text-zinc-100'>{projectName}</span>
                                    </p>
                                </div>

                                <div className='relative flex items-center gap-3'>
                                    <div className='absolute -left-8 w-4 h-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center'>
                                        <History size={10} className='text-zinc-400' />
                                    </div>
                                    <p className='text-xs text-zinc-500'>
                                        <span className='font-bold text-zinc-800 dark:text-zinc-200'>rodriggopda</span> moveu para <span className='font-bold text-blue-500'>Em andamento</span>
                                    </p>
                                </div>
                            </div>

                            {/* Comment Editor Hierarchy */}
                            <div className='pt-4 pb-10'>
                                <div className='flex items-start gap-4'>
                                    <img src={displayTask.assignee?.avatar} className='w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 mt-1' />
                                    <div className='flex-1'>
                                        <RichEditor
                                            content={comment}
                                            onChange={setComment}
                                            placeholder="Deixe um comentário ou anotação..."
                                        />
                                        <div className='mt-3 flex items-center justify-end'>
                                            <Button size="md" className='px-6'>
                                                Comentar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Metadata Sidebar (Hierarchy Reference: GitHub) */}
                        <div className='w-[300px] border-l border-zinc-200 dark:border-zinc-800 px-6 py-6 space-y-8 overflow-y-auto bg-white dark:bg-[#09090b]'>

                            {/* Sidebar Sections */}
                            <div className='space-y-6'>
                                <div className='group'>
                                    <div className='flex items-center justify-between mb-2.5'>
                                        <span className='text-[11px] font-black text-zinc-400'>Responsáveis</span>
                                        <Button size="icon" variant="ghost" className='h-6 w-6 text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200'><Settings size={14} /></Button>
                                    </div>
                                    <div className='flex items-center gap-2 px-1'>
                                        <img src={displayTask.assignee?.avatar} className='w-6 h-6 rounded-full border border-zinc-200 dark:border-zinc-800' />
                                        <span className='text-xs font-bold text-zinc-700 dark:text-zinc-300'>{displayTask.assignee?.name}</span>
                                    </div>
                                </div>

                                <div className='h-px bg-zinc-100 dark:bg-zinc-800/50' />

                                <div>
                                    <div className='flex items-center justify-between mb-2.5'>
                                        <span className='text-[11px] font-black text-zinc-400'>Etiquetas</span>
                                        <button className='text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors'><Settings size={14} /></button>
                                    </div>
                                    <div className='flex flex-wrap gap-1.5 px-1'>
                                        {displayTask.tags?.map(tag => (
                                            <span key={tag.label} className={`text-[10px] font-black px-2 py-0.5 rounded border ${tag.color}`}>
                                                {tag.label}
                                            </span>
                                        )) || <span className='text-xs text-zinc-400 italic'>Sem etiquetas</span>}
                                    </div>
                                </div>

                                <div className='h-px bg-zinc-100 dark:bg-zinc-800/50' />

                                <div>
                                    <div className='flex items-center justify-between mb-2.5'>
                                        <span className='text-[11px] font-black text-zinc-400'>Projeto atual</span>
                                        <button className='text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors'><Settings size={14} /></button>
                                    </div>
                                    <div className='p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-4'>
                                        <div className='flex items-center gap-2 text-xs font-black text-zinc-900 dark:text-zinc-100'>
                                            {projectName}
                                        </div>
                                        <div className='space-y-3'>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-[11px] font-bold text-zinc-400'>Status</span>
                                                <span className={`px-2 py-0.5 rounded-full font-black text-[9px] border ${status.color}`}>{status.label}</span>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-[11px] font-bold text-zinc-400'>Prioridade</span>
                                                <span className={`font-black flex items-center gap-1.5 text-xs ${priority.color}`}>
                                                    <span className='text-base'>{priority.icon}</span> {priority.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='h-px bg-zinc-100 dark:bg-zinc-800/50' />

                                <div>
                                    <div className='flex items-center justify-between mb-2.5'>
                                        <span className='text-[11px] font-black text-zinc-400'>Milestone</span>
                                        <button className='text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors'><Settings size={14} /></button>
                                    </div>
                                    <span className='text-xs text-zinc-400 italic px-1'>Nenhum marco definido</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </Drawer>
    );
}
