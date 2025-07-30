import { Link, useList, useTranslation } from '@refinedev/core';
import { Button, List } from 'antd';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat.tsx';
import { PageContent } from '@/shared/components/page-content';
import { PageHeader } from '@/shared/components/page-header';

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
