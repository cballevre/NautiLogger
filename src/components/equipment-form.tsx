import { useTranslation } from '@refinedev/core';
import { Form, Input } from 'antd';
import type { FC } from 'react';

interface EquipmentFormProps {
  formProps: any;
  handleOnFinish: (values: any) => void;
}

const EquipmentForm: FC<EquipmentFormProps> = ({
  formProps,
  handleOnFinish,
}) => {
  const { translate } = useTranslation();

  return (
    <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
      <Form.Item label={translate('equipments.form.labels.name')} name="name">
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('equipments.form.labels.description')}
        name="description"
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export { EquipmentForm };
