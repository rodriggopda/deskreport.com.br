import { useEffect } from 'react';
import { SubmenuItem, useSubmenuNavigation } from '../../store';

type PageProps = {
  navigation?: SubmenuItem[];
  children?: React.ReactNode;
};

export function Page({ navigation, children }: PageProps) {
  const [setNavigation] = useSubmenuNavigation((state) => [state.setNavigation]);

  useEffect(() => {
    if (navigation) setNavigation(navigation);
  }, [navigation, setNavigation]);

  return <div className='flex-1 max-h-screen overflow-hidden'>{children}</div>;
}
