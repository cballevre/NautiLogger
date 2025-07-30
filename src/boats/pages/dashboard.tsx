import { useTranslation } from '@refinedev/core';

import { PageHeader } from '@/shared/components/page-header';

const BoatDashboard = () => {
  const { translate } = useTranslation();
  return <PageHeader title={translate('boats.dashboard.title')} />;
};

export { BoatDashboard };
