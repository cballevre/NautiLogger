import { Link, useOne, useTranslation } from '@refinedev/core';
import { Button, Typography } from 'antd';
import { useParams } from 'react-router';

import { PageContent } from '@/components/page-content.tsx';
import { PageHeader } from '@/components/page-header.tsx';
import { useCurrentBoat } from '@/hooks/use-current-boat.tsx';

const ShowEquipment = () => {
  const { data: boat } = useCurrentBoat();
  const { equipmentId } = useParams();
  const { data: equipment } = useOne({
    resource: 'equipments',
    id: equipmentId as string,
  });

  const { translate } = useTranslation();

  return (
    <>
      <PageHeader
        title={translate('equipments.show.title')}
        actions={
          <Link to={`/boats/${boat?.data.id}/equipments/${equipmentId}/edit`}>
            <Button type="primary">{translate('equipments.show.edit')}</Button>
          </Link>
        }
      />
      <PageContent>
        <Typography.Paragraph>
          <strong>{translate('equipments.form.labels.name')}:</strong>
          {equipment?.data.name}
        </Typography.Paragraph>
        <Typography.Paragraph>
          {equipment?.data.description}
        </Typography.Paragraph>
      </PageContent>
    </>
  );
};

export { ShowEquipment };
