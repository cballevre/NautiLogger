import { Link, useList, useTranslation } from '@refinedev/core';
import { List, Typography } from 'antd';

const InterventionList = () => {
  const { data: interventions } = useList({
    resource: 'interventions',
  });

  console.log(interventions);

  const { translate } = useTranslation();

  return (
    <div>
      <Typography.Title level={2}>
        {translate('InterventionList.title')}
      </Typography.Title>
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
                    to={`/boats/${intervention.boat_id}/interventions/${intervention.id}`}
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
