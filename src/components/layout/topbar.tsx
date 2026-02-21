import { Toolbar } from './toolbar';
import { useSubmenuNavigation } from '../../store';
import { SubNavLink } from './navbar';

type TopbarProps = {
  title?: string;
  toolbarOptions?: React.ReactNode;
  children?: React.ReactNode;
  inputSearch?: 'on' | 'off';
};

export function Topbar({ title, children, toolbarOptions, inputSearch }: TopbarProps) {
  const [navigation] = useSubmenuNavigation((state) => [state.navigation])

  return (
    <div className='toolbar bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors'>
      <div className='py-3 border-b border-neutral-200 dark:border-neutral-800/50 w-full flex items-center justify-between px-10'>
        <div className='flex items-center gap-3 w-full'>
          <h1 className='text-xl items-center whitespace-nowrap font-semibold'>
            {title}
          </h1>
          <div className='ml-10 flex space-x-2 w-full text-sm'>
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
  );
}
