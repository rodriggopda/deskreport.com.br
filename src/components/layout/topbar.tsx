import { Toolbar } from './toolbar';
import { useSubmenuNavigation } from '../../store';
import { SubNavLink } from './navbar';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from '../ui/dropdown';
import { useTenant } from '../../hooks/useTenant';

type TopbarProps = {
  title?: string;
  toolbarOptions?: React.ReactNode;
  children?: React.ReactNode;
  inputSearch?: 'on' | 'off';
  smartHeader?: boolean;
};

export function Topbar({ title, children, toolbarOptions, inputSearch, smartHeader }: TopbarProps) {
  const [navigation] = useSubmenuNavigation((state) => [state.navigation])
  const { company_id, project_id } = useTenant();
  const navigate = useNavigate();
  const location = useLocation();

  const companies = [
    { id: '4go', name: '4Go Company' },
    { id: 'codedroplet', name: 'Codedroplet' }
  ];

  const projects = [
    { id: 'deskreport', name: 'DeskReport' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'vendas', name: 'Vendas' }
  ];

  const currentCompany = company_id || '4go';
  const isTasksRoute = location.pathname.includes('/tasks');

  const handleCompanyChange = (id: string) => {
    // Mantém o usuário no mesmo path relativo, apenas trocando o ID da empresa
    const pathSegments = location.pathname.split('/');
    // O primeiro segmento é vazio, o segundo é o company_id
    if (pathSegments.length > 1) {
      pathSegments[1] = id;
      navigate(pathSegments.join('/'));
    } else {
      navigate(`/${id}/resume`);
    }
  };

  const handleProjectChange = (id: string) => {
    navigate(`/${company_id}/${id}/tasks/all`);
  };

  if (smartHeader === undefined) {
    smartHeader = true;
  }

  return (
    <>
      {smartHeader ? (
        <div className='toolbar bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors'>
          <div className='py-2 border-b border-neutral-200 dark:border-neutral-800/50 w-full flex items-center justify-between px-10'>
            <div className='flex items-center gap-1 w-full'>
              <Dropdown
                options={companies}
                value={currentCompany}
                onChange={handleCompanyChange}
              />

              {isTasksRoute && (
                <>
                  {/* <ChevronRight size={16} strokeWidth={2} className='text-neutral-400 mx-1' /> */}
                  <span className='text-neutral-400 mx-1'>/</span>
                  <Dropdown
                    options={projects}
                    value={project_id || 'deskreport'}
                    onChange={handleProjectChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      <div className='toolbar bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors'>
        <div className='py-2 border-b border-neutral-200 dark:border-neutral-800/50 w-full flex items-center justify-between px-10'>
          <div className='flex items-center gap-3 w-full'>
            <h1 className='text-lg items-center whitespace-nowrap font-semibold'>
              {title}
            </h1>
            <div className='ml-6 flex space-x-2 w-full text-sm'>
              {
                navigation.map((subitem) => (
                  <SubNavLink key={subitem.to} name={subitem.name} to={subitem.to} />
                ))
              }
            </div>
          </div>
        </div>
        {children ? (
          <Toolbar inputSearch={inputSearch} toolbarOptions={toolbarOptions}>
            {children}
          </Toolbar>
        ) : null}
      </div>
    </>
  );
}
