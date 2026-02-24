import { useOrganization } from '../../lib/auth-client';
import { useUIStore } from '../../store';
import { MessageSquare, Search, Circle } from 'lucide-react';

export function InternalChatSidebar() {
    const { isChatSidebarOpen, isChatSidebarEnabled } = useUIStore();
    const { data: organization } = useOrganization();

    if (!isChatSidebarEnabled) return null;

    // Mock users if organization doesn't have members yet or for visual development
    const members = (organization as any)?.members || [
        { user: { name: 'Rodrigo', image: 'https://robohash.org/rodrigo.png?set=set5' }, role: 'owner' },
        { user: { name: 'Alice', image: 'https://robohash.org/alice.png?set=set5' }, role: 'member' },
        { user: { name: 'Bob', image: 'https://robohash.org/bob.png?set=set5' }, role: 'member' },
    ];

    return (
        <aside
            className={`h-screen flex flex-col bg-zinc-900 border-l border-white/5 transition-all duration-300 ease-in-out z-40 ${isChatSidebarOpen ? 'w-64' : 'w-0 opacity-0 pointer-events-none'
                }`}
        >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                    <MessageSquare size={18} className="text-zinc-400" />
                    <span className="font-semibold text-sm">Chat Interno</span>
                </div>
            </div>

            {/* Search */}
            <div className="p-3">
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Buscar colega..."
                        className="w-full bg-zinc-800/50 border-none rounded-lg py-2 pl-9 pr-3 text-xs text-zinc-300 placeholder:text-zinc-600 focus:ring-1 focus:ring-zinc-700 outline-none transition-all"
                    />
                </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                <div className="px-2 mb-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Membros - {organization?.name}</span>
                </div>

                {members.map((member: any, i: number) => (
                    <button
                        key={i}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group text-left"
                    >
                        <div className="relative">
                            <img
                                src={member.user.image}
                                alt={member.user.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-zinc-700 transition-all"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full"></div>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-zinc-200 truncate">{member.user.name}</span>
                            <span className="text-[10px] text-zinc-500 truncate capitalize">{member.role}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Footer / My Status */}
            <div className="p-4 bg-zinc-950/50 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Circle size={12} className="text-blue-500 fill-blue-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-zinc-300">Meu Status</span>
                        <span className="text-[10px] text-emerald-500">Disponível</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
