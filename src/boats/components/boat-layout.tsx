import { Outlet } from 'react-router';

import { BoatMenu } from '@/boats/components/boat-menu.tsx';
import { PageLayout } from '@/components/page-layout';

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
