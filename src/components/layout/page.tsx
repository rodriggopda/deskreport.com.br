type PageProps = {
  children?: React.ReactNode;
};

export function Page({ children }: PageProps) {
  return <div className='flex-1 max-h-screen overflow-hidden'>{children}</div>;
}
