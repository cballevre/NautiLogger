import { Create, useForm } from '@refinedev/antd';
import { useGo, useTranslation } from '@refinedev/core';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat.tsx';
import { EquipmentForm } from '@/components/equipment-form.tsx';

interface EquipmentFormValues {
  [key: string]: any;
}

const AddEquipment = () => {
  const { data: boat } = useCurrentBoat();
  const { translate } = useTranslation();
  const go = useGo();

  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: 'equipments',
    action: 'create',
    redirect: false,
  });

  const handleOnFinish = (values: EquipmentFormValues) => {
    onFinish({
      boat_id: boat?.data.id,
      ...values,
    });
    go({
      to: `/boats/${boat?.data.id}/equipments`,
      type: 'replace',
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
