import { Outlet } from 'react-router';

import { BoatMenu } from '@/components/boat-menu.tsx';
import { PageLayout } from './page-layout';

const BoatLayout = () => {
  return (
    <>
      <BoatMenu />
      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  );
};

export { BoatLayout };
