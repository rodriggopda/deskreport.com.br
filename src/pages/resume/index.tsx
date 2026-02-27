import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import { useSession } from '../../lib/auth-client';
import { CheckCircle2, UserPlus, FileText, UploadCloud, BellRing, Target, ActivitySquare, AlertCircle } from 'lucide-react';

export default function Resume() {
  const { data: session } = useSession();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const name = session?.user?.name?.split(' ')[0] || 'visitante';

  return (
    <Page navigation={[]}>
      <Topbar title='Início' inputSearch='off' />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            {getGreeting()}, <span className="text-blue-600 dark:text-blue-500">{name}</span>.
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-base font-medium">
            Aqui está o que precisa da sua atenção hoje para manter tudo na linha.
          </p>
        </div>

        {/* Focus Actions - high priority actionable items that block progress */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Foco Principal</h2>
          </div>

          <div className="grid gap-4">
            <ActionableItem
              icon={<UserPlus />}
              title="Convide novos membros"
              description="Sua organização DeskReport está vazia. Adicione sua equipe para começar a colaborar."
              status="pending"
              priority="high"
              actionText="Convidar Equipe"
            />

            <ActionableItem
              icon={<UploadCloud />}
              title="Complete seu perfil"
              description="Adicione uma foto de perfil e seu cargo para que a equipe te reconheça facilmente."
              status="pending"
              priority="normal"
              actionText="Editar Perfil"
            />
          </div>
        </div>

        {/* Operational Updates - what is happening right now in the app */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ActivitySquare className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Radar de Operações</h2>
          </div>

          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800/80">

              <LogItem
                icon={<BellRing className="w-4 h-4 text-amber-500" />}
                title="Você tem 3 tarefas atrasadas"
                time="Hoje, 09:00"
                category="Tarefas"
                isCritical
              />

              <LogItem
                icon={<FileText className="w-4 h-4 text-blue-500" />}
                title="Relatório de Atendimentos de Fevereiro gerado"
                time="Ontem, 18:30"
                category="Documentos"
              />

              <LogItem
                icon={<AlertCircle className="w-4 h-4 text-zinc-400" />}
                title="O painel de tarefas do Projeto Base está sem movimento há 5 dias"
                time="Há 2 dias"
                category="Projetos"
              />

              <LogItem
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                title="Revisão final concluída por Carlos Mendes"
                time="Há 3 dias"
                category="Atividades"
              />

            </div>
          </div>
        </div>

      </div>
    </Page>
  );
}


function ActionableItem({
  icon,
  title,
  description,
  status,
  priority,
  actionText
}: {
  icon: React.ReactNode,
  title: string,
  description: string,
  status: 'pending' | 'done',
  priority: 'high' | 'normal',
  actionText: string
}) {
  return (
    <div className={`
      relative overflow-hidden group p-5 rounded-2xl border transition-all duration-300
      ${status === 'done'
        ? 'bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800 opacity-60'
        : priority === 'high'
          ? 'bg-white dark:bg-[#121214] border-blue-200 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700'
          : 'bg-white dark:bg-[#121214] border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
      }
    `}>
      {priority === 'high' && status === 'pending' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mx-10 -my-10"></div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className={`
            p-3 rounded-xl shrink-0
            ${status === 'done'
              ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
              : priority === 'high' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'}
          `}>
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
              {priority === 'high' && status === 'pending' && (
                <span className="px-2 py-0.5 text-[10px] uppercase font-black tracking-wider bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-md">
                  Prioridade
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl pr-4">
              {description}
            </p>
          </div>
        </div>

        <button className={`
          shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm transition-all
          ${status === 'done'
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
            : priority === 'high'
              ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white active:scale-95'
          }
        `}>
          {status === 'done' ? 'Concluído' : actionText}
        </button>
      </div>
    </div>
  )
}


function LogItem({
  icon,
  title,
  time,
  category,
  isCritical = false
}: {
  icon: React.ReactNode,
  title: string,
  time: string,
  category: string,
  isCritical?: boolean
}) {
  return (
    <div className="group flex items-start gap-4 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer">
      <div className="mt-0.5 shrink-0 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full border border-zinc-200 dark:border-zinc-700 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex sm:items-center flex-col sm:flex-row justify-between gap-1 mb-1">
          <h4 className={`text-sm font-semibold truncate ${isCritical ? 'text-red-600 dark:text-red-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
            {title}
          </h4>
          <span className="text-xs font-medium text-zinc-400 whitespace-nowrap">{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
            {category}
          </span>
        </div>
      </div>
    </div>
  )
}
