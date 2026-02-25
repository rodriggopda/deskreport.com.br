import { useState, useEffect } from 'react';
import { authClient } from '../../lib/auth-client';
import { useTenantStore } from '../../store';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Clock, AlertTriangle, Layers, Activity, TrendingUp, CalendarDays, CheckCircle2 } from 'lucide-react';

interface DashboardSummary {
    total_projects: number;
    total_tasks: number;
    pending_tasks: number;
    overdue_tasks: number;
    active_members: number;
}


interface UpcomingDeadline {
    id: string;
    title: string;
    dueDate: string;
    priority: string;
    assignee?: {
        name: string;
        image?: string;
    };
}

interface ProjectHealth {
    id: string;
    name: string;
    status: 'on_track' | 'at_risk' | 'delayed';
    completion_percentage: number;
    total_tasks: number;
    completed_tasks: number;
}

interface TaskTrend {
    date: string;
    created: number;
    completed: number;
}

export function DashboardView() {
    const orgId = useTenantStore(s => s.organizations[0]?.id || '');
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [deadlines, setDeadlines] = useState<UpcomingDeadline[]>([]);
    const [health, setHealth] = useState<ProjectHealth[]>([]);
    const [trends, setTrends] = useState<TaskTrend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orgId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const headers = { 'x-organization-id': orgId };
                const [sumRes, deadRes, healthRes, trendsRes] = await Promise.all([
                    authClient.$fetch<DashboardSummary>('http://localhost:3000/dashboard/summary', { headers }),
                    authClient.$fetch<UpcomingDeadline[]>('http://localhost:3000/dashboard/upcoming-deadlines', { headers }),
                    authClient.$fetch<ProjectHealth[]>('http://localhost:3000/dashboard/project-health', { headers }),
                    authClient.$fetch<TaskTrend[]>('http://localhost:3000/dashboard/task-trends', { headers }),
                ]);

                if (sumRes.data) setSummary(sumRes.data);
                if (deadRes.data) setDeadlines(deadRes.data);
                if (healthRes.data) setHealth(healthRes.data);
                if (trendsRes.data) setTrends(trendsRes.data);

            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [orgId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500 gap-4">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="animate-pulse font-medium text-sm">Atualizando suas métricas...</p>
            </div>
        );
    }

    if (!summary) return null;

    const taskStatusData = [
        { name: 'Concluídas', value: summary.total_tasks - summary.pending_tasks, color: '#10b981' },
        { name: 'Pendentes', value: summary.pending_tasks, color: '#f59e0b' },
        { name: 'Atrasadas', value: summary.overdue_tasks, color: '#ef4444' },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl text-white">
                    <p className="text-zinc-400 text-xs mb-2 font-medium">{label}</p>
                    {payload.map((p: any) => (
                        <div key={p.dataKey} className="flex items-center gap-2 text-sm font-semibold">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                            {p.name === 'created' ? 'Criadas:' : p.name === 'completed' ? 'Concluídas:' : p.name} {p.value}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6 pb-12 overflow-x-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4 px-1">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Visão Global</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Acompanhe o compasso e produtividade do ambiente agora.</p>
                </div>
                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 mb-1">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Em tempo real</span>
                </div>
            </div>

            {/* KPI Cards Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <KPICard title="Total de Tarefas" value={summary.total_tasks} icon={<Activity />} gradient="from-blue-500 to-indigo-600" />
                <KPICard title="Tarefas Concluídas" value={summary.total_tasks - summary.pending_tasks} icon={<CheckCircle2 />} gradient="from-emerald-400 to-green-600" />
                <KPICard title="Tarefas Atrasadas" value={summary.overdue_tasks} icon={<AlertTriangle />} gradient="from-red-400 to-rose-600" />
                <KPICard title="Projetos Ativos" value={summary.total_projects} icon={<Layers />} gradient="from-violet-500 to-purple-600" />
            </div>

            {/* Trends & Workload */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Trend Chart Area (Spans 2 columns) */}
                <div className="xl:col-span-2 bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -mx-32 -my-32 transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>
                    <div className="flex items-center justify-between z-10 mb-6">
                        <div>
                            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" /> Progresso da Semana
                            </h4>
                            <p className="text-xs text-zinc-500 mt-1">Velocidade de criação versus fechamento dos últimos 7 dias</p>
                        </div>
                    </div>
                    <div className="h-72 w-full z-10 shrink-0 mt-auto">
                        {trends.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trends} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                                    <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="created" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCreated)" />
                                    <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-sm text-zinc-400">Sem dados recentes suficientes</div>
                        )}
                    </div>
                </div>

                {/* Status Doughnut */}
                <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-emerald-500" /> Proporção Global
                        </h4>
                        <p className="text-xs text-zinc-500 mt-1">Status de todas as tarefas da organização</p>
                    </div>
                    <div className="h-56 my-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={taskStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {taskStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {taskStatusData.map(d => (
                            <div key={d.name} className="flex flex-col items-center">
                                <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">{d.name}</div>
                                <div className="text-lg font-black" style={{ color: d.color }}>{d.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Health & Progress */}
                <div className="lg:col-span-2 bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-violet-500" /> Saúde dos Projetos
                        </h4>
                    </div>
                    <div className="space-y-4">
                        {health.map((proj) => (
                            <div key={proj.id} className="group relative p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                                            <FolderIcon status={proj.status} />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-zinc-900 dark:text-zinc-100">{proj.name}</h5>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{proj.completed_tasks} de {proj.total_tasks} tarefas entregues</p>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1.5 w-fit
                                        ${proj.status === 'on_track' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20' :
                                            proj.status === 'at_risk' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-500/20' :
                                                'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-500/20'
                                        }`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${proj.status === 'on_track' ? 'bg-emerald-500' : proj.status === 'at_risk' ? 'bg-amber-500' : 'bg-red-500'}`} />
                                        {proj.status === 'on_track' ? 'No Prazo' : proj.status === 'at_risk' ? 'Em Risco' : 'Atrasado'}
                                    </span>
                                </div>
                                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${proj.completion_percentage === 100 ? 'bg-emerald-500' : 'bg-violet-500'}`}
                                        style={{ width: `${proj.completion_percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                        {health.length === 0 && (
                            <div className="text-center py-10 opacity-50 flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
                                <Layers className="w-8 h-8 text-zinc-400 mb-2" />
                                <span className="font-medium text-sm text-zinc-500">Nenhum projeto mensurável</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Deadlines */}
                <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-amber-500" /> Próximas Entregas
                        </h4>
                    </div>
                    <div className="space-y-4">
                        {deadlines.map((task) => {
                            const date = new Date(task.dueDate);
                            const isOverdue = date < new Date();

                            return (
                                <div key={task.id} className="flex relative items-center gap-3 group">
                                    <div className={`w-1 absolute -left-6 top-2 bottom-2 rounded-r-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                    <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
                                        <div className="text-center leading-none">
                                            <div className={`text-[9px] font-black uppercase tracking-wider ${isOverdue ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                                {date.toLocaleDateString('pt-BR', { month: 'short' })}
                                            </div>
                                            <div className={`text-[13px] font-bold mt-0.5 ${isOverdue ? 'text-red-500' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                                {date.toLocaleDateString('pt-BR', { day: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-500 transition-colors cursor-pointer">
                                            {task.title}
                                        </h5>
                                        {task.assignee ? (
                                            <div className="flex items-center gap-1.5 mt-1">
                                                {task.assignee.image ? (
                                                    <img src={task.assignee.image} className="w-4 h-4 rounded-full border border-zinc-200 dark:border-zinc-700" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 flex items-center justify-center text-[8px] font-black border border-indigo-200 dark:border-indigo-800">
                                                        {task.assignee.name.charAt(0)}
                                                    </div>
                                                )}
                                                <span className="text-xs text-zinc-500 font-medium truncate">{task.assignee.name.split(' ')[0]}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider mt-1 block">Sem responsável</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {deadlines.length === 0 && (
                            <div className="text-center py-10 opacity-50 flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
                                <Clock className="w-8 h-8 text-zinc-400 mb-2" />
                                <span className="font-medium text-sm text-zinc-500">Radar Livre</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}


function KPICard({ title, value, icon, gradient }: { title: string, value: number | string, icon: React.ReactNode, gradient: string }) {
    return (
        <div className="relative overflow-hidden bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm group hover:-translate-y-1 transition-transform duration-300">
            {/* Ambient Background Gradient Glow */}
            <div className={`absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.08] dark:opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

            <div className="flex items-start justify-between relative z-10">
                <div>
                    <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-bold tracking-wider uppercase mb-1">{title}</h3>
                    <div className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">{value}</div>
                </div>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-black/10`}>
                    <div className="opacity-90 w-5 h-5 flex items-center justify-center">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
}

function FolderIcon({ status }: { status: string }) {
    if (status === 'on_track') return <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
    if (status === 'at_risk') return <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    return <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
