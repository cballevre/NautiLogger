import { Link, useList, useTranslation } from '@refinedev/core';
import { Button, List, Typography } from 'antd';

import { PageContent } from '@/components/page-content';
import { PageHeader } from '@/components/page-header';
import { useCurrentBoat } from '@/hooks/use-current-boat';

const InterventionList = () => {
  const { data: boat } = useCurrentBoat();
  const { data: interventions } = useList({
    resource: 'interventions',
  });

  const { translate } = useTranslation();

  return (
    <>
      <PageHeader
        title={translate('InterventionList.title')}
        actions={
          <Link to={`/boats/${boat?.data.id}/interventions/add`}>
            <Button type="primary">{translate('InterventionList.add')}</Button>
          </Link>
        }
      />
      <PageContent>
        <List
          itemLayout="horizontal"
          dataSource={interventions?.data || []}
          renderItem={(intervention) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link
                    to={`/boats/${boat?.data.id}/interventions/${intervention.id}`}
                  >
                    {intervention.title}
                  </Link>
                }
                description={intervention.description}
              />
            </List.Item>
          )}
        />
      </PageContent>
    </>
  );
};

export { InterventionList };
