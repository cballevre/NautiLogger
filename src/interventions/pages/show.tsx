import { Link, useOne, useTranslation } from '@refinedev/core';
import { Button, Typography } from 'antd';
import { useParams } from 'react-router';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import { PageContent } from '@/shared/components/page-content';
import { PageHeader } from '@/shared/components/page-header';

const ShowIntervention = () => {
  const { data: boat } = useCurrentBoat();
  const { interventionId } = useParams();
  const { data: intervention } = useOne({
    resource: 'interventions',
    id: interventionId as string,
  });

  const { translate } = useTranslation();

  return (
    <>
      <PageHeader
        title={intervention?.data.title}
        actions={
          <Link
            to={`/boats/${boat?.data.id}/interventions/${interventionId}/edit`}
          >
            <Button type="primary">
              {translate('interventions.show.edit')}
            </Button>
          </Link>
        }
      />
      <PageContent>
        <Typography.Paragraph>
          {intervention?.data.description}
        </Typography.Paragraph>
      </PageContent>
    </>
  );
};

export { ShowIntervention };
