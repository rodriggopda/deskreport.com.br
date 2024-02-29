import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';

export default function Tasks() {
  return (
    <Page navigation={[
      { name: 'Todas', to: '/tasks/all' },
      { name: 'Em andamento', to: '/tasks/in-progress' },
      { name: 'Vencidas', to: '/tasks/overdue' },
      { name: 'Finalizadas', to: '/tasks/finalized' },
    ]}>
      <Topbar title='Demandas' />
    </Page>
  );
}
