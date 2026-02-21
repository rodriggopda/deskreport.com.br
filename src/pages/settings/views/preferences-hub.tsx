import React, { useState, useEffect } from 'react';
import { Share2, AlertCircle, Sun, Moon, Monitor, Bell, BellRing, Settings, Zap } from 'lucide-react';

export function PreferencesHub() {
    const [theme, setTheme] = useState('light');
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        if ('Notification' in window) {
            setNotificationPermission(Notification.permission);
        }
    }, []);

    const requestNotificationPermission = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            setNotificationPermission(permission);
        }
    };

    return (
        <div className="space-y-8 animate-slide-up pb-10">

            {/* HEADER INFORMATIVO */}
            <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg shadow-sky-500/20 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        Configurações e Preferências
                        <Settings size={24} className="text-sky-200" />
                    </h3>
                    <p className="text-sky-100 text-sm leading-relaxed">
                        Personalize sua experiência na plataforma DeskReport. Ajuste o tema visual, configure notificações e gerencie suas integrações.
                    </p>
                </div>
                <Share2 size={120} className="absolute -right-10 -top-10 text-white/10 rotate-12" />
            </div>

            {/* TEMA / APARÊNCIA */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
                    <div className="p-2 bg-sky-50 dark:bg-sky-900/20 rounded-lg text-sky-500">
                        <Sun size={20} className="dark:hidden" />
                        <Moon size={20} className="hidden dark:block" />
                    </div>
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg">Aparência e Tema</h3>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ThemeOption
                            id="light"
                            name="Claro"
                            active={theme === 'light'}
                            onClick={() => setTheme('light')}
                            icon={<Sun size={16} />}
                        />
                        <ThemeOption
                            id="dark"
                            name="Escuro"
                            active={theme === 'dark'}
                            onClick={() => setTheme('dark')}
                            icon={<Moon size={16} />}
                        />
                        <ThemeOption
                            id="system"
                            name="Automático"
                            active={theme === 'system'}
                            onClick={() => setTheme('system')}
                            icon={<Monitor size={16} />}
                            description="Sincroniza com seu sistema"
                        />
                    </div>
                </div>
            </div>

            {/* NOTIFICAÇÕES */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-500">
                            <Bell size={20} />
                        </div>
                        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg">Notificações do Navegador</h3>
                    </div>
                    {notificationPermission === 'default' && (
                        <button
                            onClick={requestNotificationPermission}
                            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                        >
                            <BellRing size={16} />
                            Habilitar Notificações
                        </button>
                    )}
                </div>
                <div className="p-8">
                    <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 mb-6">
                        <div className={`p-2 rounded-full ${notificationPermission === 'granted' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-500' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-neutral-800 dark:text-neutral-100 block">
                                Status: {notificationPermission === 'granted' ? 'Habilitadas' : notificationPermission === 'denied' ? 'Bloqueadas' : 'Não Configuradas'}
                            </span>
                            <span className="text-xs text-neutral-500">
                                {notificationPermission === 'granted' ? 'Você receberá alertas de novos pedidos e atualizações importantes.' : 'Ative nas configurações do navegador para receber alertas.'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <NotificationToggle label="Novos Pedidos" description="Receber alerta quando uma nova venda for iniciada." defaultChecked />
                        <NotificationToggle label="Mensagens de Clientes" description="Alertar sobre novas conversas no WhatsApp." defaultChecked />
                        <NotificationToggle label="Alertas do Sistema" description="Avisos sobre manutenções ou atualizações." />
                        <NotificationToggle label="Estoque Baixo" description="Notificar quando produtos atingirem o limite mínimo." />
                    </div>
                </div>
            </div>

        </div>
    );
}

function ThemeOption({ id, name, icon, description, active, onClick }: { id: string, name: string, icon: React.ReactNode, description?: string, active: boolean, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer rounded-2xl border-2 p-4 transition-all group ${active ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-500/10' : 'border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700'}`}
        >
            <div className={`aspect-[4/3] rounded-xl mb-4 overflow-hidden border border-neutral-200 dark:border-neutral-800 relative ${id === 'light' ? 'bg-white' : id === 'dark' ? 'bg-neutral-900' : 'bg-gradient-to-br from-white to-neutral-900'}`}>
                {/* Mock UI for Light Theme */}
                {id === 'light' && (
                    <div className="p-2 space-y-2">
                        <div className="w-full h-2 bg-neutral-100 rounded" />
                        <div className="flex gap-2">
                            <div className="w-4 h-4 bg-sky-500 rounded" />
                            <div className="flex-1 h-4 bg-neutral-50 rounded" />
                        </div>
                    </div>
                )}
                {/* Mock UI for Dark Theme */}
                {id === 'dark' && (
                    <div className="p-2 space-y-2">
                        <div className="w-full h-2 bg-neutral-800 rounded" />
                        <div className="flex gap-2">
                            <div className="w-4 h-4 bg-sky-400 rounded" />
                            <div className="flex-1 h-4 bg-neutral-800 rounded" />
                        </div>
                    </div>
                )}
                {/* Mock UI for System Theme */}
                {id === 'system' && (
                    <div className="absolute inset-0 flex">
                        <div className="flex-1 bg-white p-2">
                            <div className="w-full h-2 bg-neutral-100 rounded" />
                            <div className="w-4 h-4 bg-sky-500 rounded mt-2" />
                        </div>
                        <div className="flex-1 bg-neutral-900 p-2 border-l border-neutral-700">
                            <div className="w-full h-2 bg-neutral-800 rounded" />
                            <div className="w-4 h-4 bg-sky-400 rounded mt-2" />
                        </div>
                    </div>
                )}
                {active && (
                    <div className="absolute inset-0 flex items-center justify-center bg-sky-500/10">
                        <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-lg">
                            <Zap size={14} className="fill-white" />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${active ? 'bg-sky-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'}`}>
                    {icon}
                </div>
                <div>
                    <span className={`text-sm font-bold block ${active ? 'text-sky-700 dark:text-sky-300' : 'text-neutral-800 dark:text-neutral-200'}`}>{name}</span>
                    {description && <span className="text-[10px] text-neutral-500">{description}</span>}
                </div>
            </div>
        </div>
    );
}

function NotificationToggle({ label, description, defaultChecked = false }: { label: string, description: string, defaultChecked?: boolean }) {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div
            onClick={() => setChecked(!checked)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${checked ? 'bg-sky-50 dark:bg-sky-900/10 border-sky-200 dark:border-sky-800' : 'bg-neutral-50 dark:bg-neutral-800/30 border-neutral-100 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'}`}
        >
            <div className="flex-1">
                <span className={`text-sm font-bold block ${checked ? 'text-sky-700 dark:text-sky-300' : 'text-neutral-700 dark:text-neutral-300'}`}>{label}</span>
                <span className="text-[10px] text-neutral-500 leading-tight">{description}</span>
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-sky-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${checked ? 'right-0.5' : 'left-0.5'}`} />
            </div>
        </div>
    );
}


