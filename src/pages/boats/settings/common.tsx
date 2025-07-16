import { useTranslation } from '@refinedev/core';

import { SettingsLayout } from '@/components/settings-layout';

const CommonSettings = () => {
  const { translate } = useTranslation();

  return (
    <SettingsLayout title={translate('CommonSettings.title')}>
      <p>Manage your boat's general settings here.</p>
    </SettingsLayout>
  );
};

export { CommonSettings };
