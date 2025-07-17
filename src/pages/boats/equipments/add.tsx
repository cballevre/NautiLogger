import { Create, useForm } from '@refinedev/antd';
import { useTranslation } from '@refinedev/core';

import { EquipmentForm } from '@/components/equipment-form.tsx';
import { useCurrentBoat } from '@/hooks/use-current-boat.tsx';

interface EquipmentFormValues {
  [key: string]: any;
}

const AddEquipment = () => {
  const { data: boat } = useCurrentBoat();
  const { translate } = useTranslation();

  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: 'equipments',
    action: 'create',
  });

  const handleOnFinish = (values: EquipmentFormValues) => {
    onFinish({
      boat_id: boat?.data.id,
      ...values,
    });
  };

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate('equipments.add.title')}
    >
      <EquipmentForm formProps={formProps} handleOnFinish={handleOnFinish} />
    </Create>
  );
};

export { AddEquipment };
