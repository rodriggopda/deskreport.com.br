import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';

export default function Teams() {
    return (
        <Page navigation={[]}>
            <Topbar title='Equipes' inputSearch='off' />
            <div className="p-8 flex flex-col items-center justify-center h-full text-neutral-400">
                <p>Em breve: Gerenciamento de Equipes.</p>
            </div>
        </Page>
    );
}
