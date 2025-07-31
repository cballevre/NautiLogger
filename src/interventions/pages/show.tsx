import { Link, useOne, useTranslate } from '@refinedev/core';
import { Button, Card, Typography } from 'antd';
import { useParams } from 'react-router';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import { PageHeader } from '@/shared/components/page-header';

const ShowIntervention = () => {
  const { data: boat } = useCurrentBoat();
  const { interventionId } = useParams();
  const { data: intervention } = useOne({
    resource: 'interventions',
    id: interventionId as string,
  });

  const translate = useTranslate();

  return (
    <>
      <PageHeader
        title={translate('interventions.show.title')}
        actions={
          <Link
            to={`/boats/${boat?.data.id}/interventions/${interventionId}/edit`}
          >
            <Button type="primary">
              {translate('interventions.show.edit')}
            </Button>
          </Link>
        }
        back={translate('interventions.show.back')}
      />
      <Card>
        <Typography.Paragraph>
          <strong>{translate('interventions.form.labels.title')}: </strong>
          {intervention?.data.title}
        </Typography.Paragraph>
        {intervention?.data.description ? (
          <Typography.Paragraph>
            <strong>
              {translate('interventions.form.labels.description')}:
            </strong>
            {intervention.data.description}
          </Typography.Paragraph>
        ) : null}
      </Card>
    </>
  );
};

export { ShowIntervention };
