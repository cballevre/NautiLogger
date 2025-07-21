import { Link, useOne, useTranslation } from '@refinedev/core';
import { Button, Typography } from 'antd';
import { useParams } from 'react-router';

import { PageHeader } from '@/components/page-header';
import { useCurrentBoat } from '@/hooks/use-current-boat';

const ShowIntervention = () => {
  const { data: boat } = useCurrentBoat();
  const { interventionId } = useParams();
  const { data: intervention } = useOne({
    resource: 'interventions',
    id: interventionId as string,
  });

  const { translate } = useTranslation();

  return (
    <div>
      <PageHeader
        title={intervention?.data.title}
        actions={
          <Link
            to={`/boats/${boat?.data.id}/interventions/${interventionId}/edit`}
          >
            <Button type="primary">{translate('InterventionShow.edit')}</Button>
          </Link>
        }
      />
      <div
        style={{ padding: '0px 16px', background: '#fff', borderRadius: '8px' }}
      >
        <Typography.Paragraph>
          {intervention?.data.description}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export { ShowIntervention };
