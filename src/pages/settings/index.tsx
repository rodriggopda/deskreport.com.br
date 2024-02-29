import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';

export default function Settings() {
  return (
    <Page navigation={[]}>
      <Topbar title='Configurações' inputSearch='off' />
    </Page>
  );
}
