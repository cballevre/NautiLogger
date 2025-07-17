import { Link, useList, useTranslation } from '@refinedev/core';
import { Button, List } from 'antd';

import { PageContent } from '@/components/page-content.tsx';
import { PageHeader } from '@/components/page-header.tsx';
import { useCurrentBoat } from '@/hooks/use-current-boat.tsx';

const EquipmentList = () => {
  const { data: boat } = useCurrentBoat();
  const { data: equipments } = useList({
    resource: 'equipments',
  });
  const { translate } = useTranslation();

  return (
    <div>
      <PageHeader
        title={translate('equipments.list.title')}
        subtitle={translate('equipments.list.subtitle')}
        actions={
          <Link to={`/boats/${boat?.data.id}/equipments/add`}>
            <Button type="primary">{translate('equipments.list.add')}</Button>
          </Link>
        }
      />
      <PageContent>
        <List
          itemLayout="horizontal"
          dataSource={equipments?.data || []}
          renderItem={(intervention) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link
                    to={`/boats/${boat?.data.id}/equipments/${intervention.id}`}
                  >
                    {intervention.name}
                  </Link>
                }
                description={intervention.description}
              />
            </List.Item>
          )}
        />
      </PageContent>
    </div>
  );
};

export { EquipmentList };
