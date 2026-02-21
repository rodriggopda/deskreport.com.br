import React, { useState, useEffect } from 'react';
import { Share2, MessageCircle, Instagram, Facebook, Zap, ExternalLink, QrCode, AlertCircle, RefreshCw } from 'lucide-react';

export function ChannelsHub() {
    const [loading, setLoading] = useState(true);
    const [waStatus, setWaStatus] = useState<'disconnected' | 'scanning' | 'connected'>('disconnected');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-8 animate-slide-up pb-10">

            {/* HEADER INFORMATIVO */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg shadow-purple-500/20 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        Central de Integrações
                        <Zap size={24} className="text-purple-200" />
                    </h3>
                    <p className="text-purple-50 text-sm leading-relaxed">
                        Conecte suas redes sociais e canais de atendimento para centralizar suas vendas.
                        Ative o WhatsApp para que seus clientes possam finalizar pedidos e conversar diretamente com seu time.
                    </p>
                </div>
                <Share2 size={120} className="absolute -right-10 -top-10 text-white/10 rotate-12" />
            </div>

            {/* WHATSAPP INTEGRATION (O PRINCIPAL) */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500">
                            <MessageCircle size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg leading-tight">WhatsApp Business</h3>
                            <p className="text-xs text-neutral-500 font-medium tracking-tight">Status: {waStatus === 'connected' ? 'Conectado' : waStatus === 'scanning' ? 'Aguardando Leitura' : 'Desconectado'}</p>
                        </div>
                    </div>
                    {waStatus === 'connected' ? (
                        <button onClick={() => setWaStatus('disconnected')} className="text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-3 py-1.5 rounded-lg transition-colors border border-rose-200 dark:border-rose-800/50">
                            Desconectar
                        </button>
                    ) : waStatus === 'disconnected' ? (
                        <button onClick={() => setWaStatus('scanning')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors shadow-sm">
                            Conectar WhatsApp
                        </button>
                    ) : null}
                </div>

                <div className="p-8">
                    {loading ? (
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-48 h-48 rounded-xl animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                            <div className="flex-1 space-y-4">
                                <div className="h-4 w-3/4 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                                <div className="h-4 w-1/2 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                                <div className="h-10 w-32 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                            </div>
                        </div>
                    ) : waStatus === 'scanning' ? (
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="relative p-2 bg-white rounded-xl border-4 border-emerald-500/20 shadow-xl">
                                <div className="w-48 h-48 bg-neutral-100 flex items-center justify-center rounded-lg overflow-hidden relative group">
                                    <img
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=deskreport-demo"
                                        alt="QR Code"
                                        className="w-full h-full opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => setWaStatus('connected')} className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold">Simular Conexão</button>
                                    </div>
                                </div>
                                <div className="absolute -bottom-3 -right-3 bg-white dark:bg-neutral-800 p-1.5 rounded-full shadow-lg border border-neutral-100 dark:border-neutral-700 animate-spin transition-all">
                                    <RefreshCw size={14} className="text-emerald-500" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-5">
                                <h4 className="font-bold text-neutral-800 dark:text-neutral-100">Como conectar:</h4>
                                <ul className="space-y-4">
                                    {[
                                        'Abra o WhatsApp no seu celular',
                                        'Toque em Menu ou Configurações e selecione Aparelhos Conectados',
                                        'Toque em Conectar um Aparelho',
                                        'Aponte seu celular para esta tela para ler o código QR'
                                    ].map((step, i) => (
                                        <li key={i} className="flex gap-3 items-start text-sm text-neutral-600 dark:text-neutral-400">
                                            <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : waStatus === 'connected' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-xl space-y-4">
                                <div className="flex items-center justify-between font-bold text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                                    <span>Instância Ativa</span>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl font-black">4G</div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-neutral-800 dark:text-neutral-100">WhatsApp Oficial DeskReport</span>
                                        <span className="text-xs text-neutral-500">+55 (11) 99999-9999</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                                <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Configurações de Mensagem</h5>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Resposta Automática</span>
                                    <div className="w-10 h-5 bg-sky-500 rounded-full relative cursor-pointer shadow-inner">
                                        <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center py-6 text-center space-y-4">
                            <div className="p-4 bg-neutral-100 dark:bg-neutral-800/50 rounded-full text-neutral-300">
                                <QrCode size={48} />
                            </div>
                            <div className="max-w-xs">
                                <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Nenhum aparelho conectado</h4>
                                <p className="text-xs text-neutral-500">Conecte seu WhatsApp para começar a receber pedidos e conversar com seus clientes via Chat.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* OUTROS CANAIS (COMING SOON) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ComingSoonChannel
                    icon={<Instagram size={20} />}
                    name="Instagram Shopping"
                    color="from-purple-500 to-pink-500"
                />
                <ComingSoonChannel
                    icon={<Facebook size={20} />}
                    name="Facebook Messenger"
                    color="from-blue-600 to-blue-400"
                />
            </div>

        </div>
    );
}

function ComingSoonChannel({ icon, name, color }: { icon: React.ReactNode, name: string, color: string }) {
    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 flex items-center justify-between opacity-70 group hover:opacity-100 transition-all cursor-not-allowed">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-md`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-100">{name}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <AlertCircle size={10} className="text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-tighter">Em breve</span>
                    </div>
                </div>
            </div>
            <ExternalLink size={16} className="text-neutral-300 group-hover:text-neutral-400 transition-colors" />
        </div>
    )
}
