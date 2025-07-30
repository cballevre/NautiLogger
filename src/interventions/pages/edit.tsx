import { Edit, useForm } from '@refinedev/antd';
import { useTranslate } from '@refinedev/core';
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
  const translate = useTranslate();

  return (
    <Edit
      title={translate('interventions.edit.title')}
      saveButtonProps={saveButtonProps}
    >
      <InterventionForm formProps={formProps} handleOnFinish={onFinish} />
    </Edit>
  );
};

export { EditIntervention };
