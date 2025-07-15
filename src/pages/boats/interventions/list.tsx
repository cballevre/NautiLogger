import { Link, useList, useTranslation } from '@refinedev/core';
import { List, Typography } from 'antd';

import { useCurrentBoat } from '@/hooks/use-current-boat';

const InterventionList = () => {
  const { data: boat } = useCurrentBoat();
  const { data: interventions } = useList({
    resource: 'interventions',
  });

  const { translate } = useTranslation();

  return (
    <div>
      <Typography.Title level={2}>
        {translate('InterventionList.title')}
      </Typography.Title>
      <Link to={`/boats/${boat?.data.id}/interventions/add`}>
        {translate('InterventionList.add')}
      </Link>
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
