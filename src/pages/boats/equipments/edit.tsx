import { Edit, useForm } from '@refinedev/antd';
import { useTranslation } from '@refinedev/core';
import { useParams } from 'react-router';

import { EquipmentForm } from '@/components/equipment-form.tsx';

interface Equipment {
  id: string;
  title: string;
  description: string;
}

const EditEquipment = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const { translate } = useTranslation();
  const { formProps, saveButtonProps, onFinish } = useForm<Equipment>({
    resource: 'equipments',
    action: 'edit',
    id: equipmentId,
  });

  return (
    <Edit
      title={translate('equipments.edit.title')}
      saveButtonProps={saveButtonProps}
    >
      <EquipmentForm formProps={formProps} handleOnFinish={onFinish} />
    </Edit>
  );
};

export { EditEquipment };
