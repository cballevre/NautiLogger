import { Edit, useForm } from '@refinedev/antd';
import { useParams } from 'react-router';

import { InterventionForm } from '@/interventions/components/intervention-form';
import type { UpdateIntervention } from '@/shared/types/models';

const EditIntervention = () => {
  const { interventionId } = useParams<{ interventionId: string }>();
  const { formProps, saveButtonProps, onFinish } = useForm<UpdateIntervention>({
    resource: 'interventions',
    action: 'edit',
    id: interventionId,
  });

  return (
    <Edit title="Edit Intervention" saveButtonProps={saveButtonProps}>
      <InterventionForm formProps={formProps} handleOnFinish={onFinish} />
    </Edit>
  );
};

export { EditIntervention };
