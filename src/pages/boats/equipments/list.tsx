import { Link, useList, useTranslation } from '@refinedev/core';
import { Button, List, Typography } from 'antd';

import { PageContent } from '@/components/page-content.tsx';
import { PageHeader } from '@/components/page-header.tsx';
import { SectionHeader } from '@/components/section-header.tsx';
import { useCurrentBoat } from '@/hooks/use-current-boat.tsx';
import { boatSystemList } from '@/models/boat-system';
import type { Equipment } from '@/models/equipment';

const EquipmentList = () => {
  const { data: boat } = useCurrentBoat();
  const { data: equipments } = useList<Equipment>({
    resource: 'equipments',
  });
  const { translate } = useTranslation();

  const groupedEquipments: Record<string, Equipment[]> =
    equipments?.data.reduce(
      (acc: Record<string, Equipment[]>, equipment: Equipment) => {
        const system = equipment.system_key;
        if (!acc[system]) {
          acc[system] = [];
        }
        acc[system].push(equipment);
        return acc;
      },
      {},
    ) || {};

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
                    description={equipment.description}
                  />
                </List.Item>
              )}
            />
          </PageContent>
        </section>
      ))}
    </div>
  );
};

export { EquipmentList };
