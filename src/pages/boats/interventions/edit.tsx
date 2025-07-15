import { Edit, useForm } from '@refinedev/antd';
import { useParams } from 'react-router';

import { InterventionForm } from '@/components/intervention-form';

interface Intervention {
  id: string;
  title: string;
  description: string;
}

const EditIntervention = () => {
  const { interventionId } = useParams<{ interventionId: string }>();
  const { formProps, saveButtonProps, onFinish } = useForm<Intervention>({
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
