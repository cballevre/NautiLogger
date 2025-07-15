import { Link, useOne, useTranslation } from '@refinedev/core';
import { Typography } from 'antd';
import { useParams } from 'react-router';
import { useCurrentBoat } from '../../../hooks/use-current-boat';

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
      <Typography.Title level={2}>{intervention?.data.title}</Typography.Title>
      <Link to={`/boats/${boat?.data.id}/interventions/${interventionId}/edit`}>
        {translate('InterventionShow.edit')}
      </Link>
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
