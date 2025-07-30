import { useTranslation } from '@refinedev/core';

import { BoatDeleteButton } from '@/boats/components/boat-delete-button';
import { SettingsLayout } from '@/boats/components/settings-layout';
import { SectionHeader } from '@/shared/components/section-header';

const CommonSettings = () => {
  const { translate } = useTranslation();

  return (
    <SettingsLayout title={translate('settings.common.title')}>
      <section>
        <SectionHeader
          title={translate('settings.common.dangerZone.title')}
          subtitle={translate('settings.common.dangerZone.description')}
        />
        <BoatDeleteButton />
      </section>
    </SettingsLayout>
  );
};

export { CommonSettings };
