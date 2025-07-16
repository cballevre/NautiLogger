import { useTranslation } from '@refinedev/core';

import { SettingsLayout } from '@/components/settings-layout';

const AccessSettings = () => {
  const { translate } = useTranslation();

  return (
    <SettingsLayout title={translate('AccessSettings.title')}>
      <p>Manage who can access your boat.</p>
    </SettingsLayout>
  );
};

export { AccessSettings };
