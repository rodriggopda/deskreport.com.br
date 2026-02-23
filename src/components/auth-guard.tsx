import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '../lib/auth-client';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data, isPending } = useSession();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isPending && !data) {
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, [data, isPending, navigate, location]);

    if (isPending) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium animate-pulse text-zinc-500">Carregando...</p>
                </div>
            </div>
        );
    }

    // Se não estiver pendente e não tiver sessão, o useEffect vai redirecionar,
    // mas logo antes do redirecionamento, evitamos renderizar o children.
    if (!data) {
        return null;
    }

    return <>{children}</>;
}
