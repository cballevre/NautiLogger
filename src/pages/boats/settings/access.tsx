import { useTranslation } from '@refinedev/core';

import { AccessList } from '@/components/access-list';
import { SettingsLayout } from '@/components/settings-layout';

const AccessSettings = () => {
  const { translate } = useTranslation();

  return (
    <SettingsLayout title={translate('AccessSettings.title')}>
      <AccessList />
    </SettingsLayout>
  );
};

export { AccessSettings };
