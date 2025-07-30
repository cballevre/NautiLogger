import { Link, useInfiniteList, useTranslation } from '@refinedev/core';
import { Button, Card, Empty, List } from 'antd';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat.tsx';
import { boatSystemList } from '@/boats/utils/boat-system';
import { PageContent } from '@/components/page-content.tsx';
import { PageHeader } from '@/components/page-header.tsx';
import { SectionHeader } from '@/components/section-header.tsx';
import { EquipmentActionsMenu } from '@/equipments/components/equipment-actions-menu';
import type { Equipment } from '@/models/equipment';

const getEquipmentSubtitle = (equipment: Equipment) => {
  return (
    (equipment.brand || equipment.model) &&
    [equipment.brand, equipment.model].filter(Boolean).join(' - ')
  );
};

const EquipmentList = () => {
  const { data: boat } = useCurrentBoat();
  const {
    data: equipments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteList<Equipment>({
    resource: 'equipments',
  });
  const { translate } = useTranslation();

  const groupedEquipments: Record<string, Equipment[]> =
    equipments?.pages
      .flatMap((page) => page.data)
      .reduce((acc: Record<string, Equipment[]>, equipment: Equipment) => {
        const system = equipment.system_key;
        if (!acc[system]) {
          acc[system] = [];
        }
        acc[system].push(equipment);
        return acc;
      }, {}) || {};

  const sortedSystems = boatSystemList.filter(
    (system) => groupedEquipments?.[system],
  );

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
      {sortedSystems.length === 0 ? (
        <Card>
          <Empty description={translate('equipments.list.empty')} />
        </Card>
      ) : null}
      {sortedSystems.map((system) => (
        <section key={system}>
          <SectionHeader
            title={translate(`boats.systems.list.${system}.name`)}
          />
          <PageContent>
            <List
              itemLayout="horizontal"
              dataSource={groupedEquipments[system]}
              renderItem={(equipment) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Link
                        to={`/boats/${boat?.data.id}/equipments/${equipment.id}`}
                      >
                        {equipment.name}
                      </Link>
                    }
                    description={getEquipmentSubtitle(equipment)}
                  />
                  <EquipmentActionsMenu equipment={equipment} />
                </List.Item>
              )}
            />
          </PageContent>
        </section>
      ))}
      {hasNextPage ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage
              ? translate('common.loading_more')
              : translate('common.load_more')}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export { EquipmentList };
