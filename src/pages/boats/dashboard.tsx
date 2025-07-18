import { useTranslation } from '@refinedev/core';

import { PageHeader } from '@/components/page-header.tsx';

const BoatDashboard = () => {
  const { translate } = useTranslation();
  return <PageHeader title={translate('pages.dashboard.title')} />;
};

export { BoatDashboard };
