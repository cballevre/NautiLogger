import type { FC, PropsWithChildren } from 'react';

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{ paddingLeft: '48px', paddingRight: '48px', marginTop: '32px' }}
    >
      {children}
    </div>
  );
};

export { PageLayout };
