import { useTranslation } from '@refinedev/core';

import { AccessList } from '@/boats/components/access-list';
import { SettingsLayout } from '@/boats/components/settings-layout';

const AccessSettings = () => {
  const { translate } = useTranslation();

  return (
    <SettingsLayout title={translate('settings.access.title')}>
      <AccessList />
    </SettingsLayout>
  );
};

export { AccessSettings };
