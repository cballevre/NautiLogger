import { useTranslation } from '@refinedev/core';
import { Button } from 'antd';

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
        <Button
          type="primary"
          danger
          onClick={() => {
            // Handle the delete action here
          }}
        >
          Delete boat
        </Button>
      </section>
    </SettingsLayout>
  );
};

export { CommonSettings };
