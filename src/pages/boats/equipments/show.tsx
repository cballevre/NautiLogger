import { Link, useOne, useTranslation } from '@refinedev/core';
import { Button, Typography } from 'antd';
import dayjs from 'dayjs';
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
          <strong>{translate('equipments.form.labels.name')}: </strong>
          {equipment?.data.name}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>{translate('equipments.form.labels.description')}: </strong>
          {equipment?.data.description}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>{translate('equipments.form.labels.system')}: </strong>
          {translate(`boats.systems.list.${equipment?.data.system_key}.name`)}
        </Typography.Paragraph>
        {equipment?.data.brand ? (
          <Typography.Paragraph>
            <strong>{translate('equipments.form.labels.brand')}: </strong>
            {equipment.data.brand}
          </Typography.Paragraph>
        ) : null}
        {equipment?.data.model ? (
          <Typography.Paragraph>
            <strong>{translate('equipments.form.labels.model')}: </strong>
            {equipment.data.model}
          </Typography.Paragraph>
        ) : null}
        {equipment?.data.serial_number ? (
          <Typography.Paragraph>
            <strong>
              {translate('equipments.form.labels.serial_number')}:{' '}
            </strong>
            {equipment.data.serial_number}
          </Typography.Paragraph>
        ) : null}
        {equipment?.data.purchase_value ? (
          <Typography.Paragraph>
            <strong>
              {translate('equipments.form.labels.purchase_value')}:{' '}
            </strong>
            {equipment.data.purchase_value.toLocaleString(undefined, {
              style: 'currency',
              currency: 'EUR',
            })}
          </Typography.Paragraph>
        ) : null}
        {equipment?.data.purchase_date ? (
          <Typography.Paragraph>
            <strong>
              {translate('equipments.form.labels.purchase_date')}:{' '}
            </strong>
            {dayjs(equipment.data.purchase_date).format('DD/MM/YYYY')}
          </Typography.Paragraph>
        ) : null}
        {equipment?.data.warranty_end_date ? (
          <Typography.Paragraph>
            <strong>
              {translate('equipments.form.labels.warranty_end_date')}:{' '}
            </strong>
            {dayjs(equipment.data.warranty_end_date).format('DD/MM/YYYY')}
          </Typography.Paragraph>
        ) : null}
      </PageContent>
    </>
  );
};

export { ShowEquipment };
