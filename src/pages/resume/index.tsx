import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';

export default function Resume() {
  return (
    <Page>
      <Topbar title='Resumo' inputSearch='off' />
    </Page>
  );
  // <div className='flex-1 max-h-screen overflow-hidden'></div>;
}
