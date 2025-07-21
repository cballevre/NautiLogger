import { Link, useList, useTranslation } from '@refinedev/core';
import { Button, List, Typography } from 'antd';

import { PageHeader } from '@/components/page-header';
import { useCurrentBoat } from '@/hooks/use-current-boat';

const InterventionList = () => {
  const { data: boat } = useCurrentBoat();
  const { data: interventions } = useList({
    resource: 'interventions',
  });

  const { translate } = useTranslation();

  return (
    <div>
      <PageHeader
        title={translate('InterventionList.title')}
        actions={
          <Link to={`/boats/${boat?.data.id}/interventions/add`}>
            <Button type="primary">{translate('InterventionList.add')}</Button>
          </Link>
        }
      />
      <div
        style={{ padding: '0px 16px', background: '#fff', borderRadius: '8px' }}
      >
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
      </div>
    </div>
  );
};

export { InterventionList };
