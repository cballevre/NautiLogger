import { useTranslation } from '@refinedev/core';
import { Button, Typography } from 'antd';

import { SettingsLayout } from '@/components/settings-layout';

const CommonSettings = () => {
  const { translate } = useTranslation();

  return (
    <SettingsLayout title={translate('settings.common.title')}>
      <section>
        <header>
          <Typography.Title level={3}>
            {translate('settings.common.dangerZone.title')}
          </Typography.Title>
          <Typography.Paragraph>
            {translate('settings.common.dangerZone.description')}
          </Typography.Paragraph>
        </header>
        <div>
          <Button
            type="primary"
            danger
            onClick={() => {
              // Handle the delete action here
            }}
          >
            Delete boat
          </Button>
        </div>
      </section>
    </SettingsLayout>
  );
};

export { CommonSettings };
