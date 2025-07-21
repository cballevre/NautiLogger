import { Create, useForm } from '@refinedev/antd';
import { useTranslation } from '@refinedev/core';

import { InterventionForm } from '@/components/intervention-form';
import { useCurrentBoat } from '@/hooks/use-current-boat';

interface InterventionFormValues {
  [key: string]: any;
}

const AddIntervention = () => {
  const { data: boat } = useCurrentBoat();
  const { translate } = useTranslation();

  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: 'interventions',
    action: 'create',
  });

  const handleOnFinish = (values: InterventionFormValues) => {
    onFinish({
      boat_id: boat?.data.id,
      ...values,
    });
  };

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate('AddIntervention.title')}
    >
      <InterventionForm formProps={formProps} handleOnFinish={handleOnFinish} />
    </Create>
  );
};

export { AddIntervention };
