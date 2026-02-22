import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import { Building2, ShieldCheck, Share2, Settings2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useTenant } from '../../hooks/useTenant';
import { CompanyHub } from './views/company-hub';
import { UserHub } from './views/user-hub';
import { ChannelsHub } from './views/channels-hub';
import { PreferencesHub } from './views/preferences-hub';

export default function Settings() {
  const { tab } = useParams();
  const { companyUrl } = useTenant();
  const currentTab = tab || 'company';

  const navigation = useMemo(() => [
    { name: 'Minha Empresa', to: companyUrl('settings/company'), icon: <Building2 size={14} /> },
    { name: 'Canais e Integrações', to: companyUrl('settings/channels'), icon: <Share2 size={14} /> },
    { name: 'Contas e Acessos', to: companyUrl('settings/accounts'), icon: <ShieldCheck size={14} /> },
    { name: 'Preferências', to: companyUrl('settings/preferences'), icon: <Settings2 size={14} /> },
  ], [companyUrl]);

  const renderContent = () => {
    switch (currentTab) {
      case 'channels': return <ChannelsHub />;
      case 'accounts': return <UserHub />;
      case 'preferences': return <PreferencesHub />;
      default: return <CompanyHub />;
    }
  };

  return (
    <Page navigation={navigation}>
      <div className="flex flex-col h-full w-full">
        <Topbar title='Configurações' inputSearch='off' />
        <div className='flex-1 overflow-y-auto bg-transparent p-6'>
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </Page>
  );
}
