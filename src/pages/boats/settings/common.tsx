import { useTranslation } from '@refinedev/core';
import { Button } from 'antd';

import { SectionHeader } from '@/components/section-header';
import { SettingsLayout } from '@/components/settings-layout';

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
