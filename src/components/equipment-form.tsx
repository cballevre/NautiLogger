import { useTranslation } from '@refinedev/core';
import { DatePicker, Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';

import { BoatSystemSelect } from '@/boats/components/boat-system-select';

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
      <Form.Item
        label={translate('equipments.form.labels.name')}
        name="name"
        rules={[
          {
            required: true,
            message: translate('equipments.form.validation.name_required'),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('equipments.form.labels.system')}
        name="system_key"
        rules={[
          {
            required: true,
            message: translate('equipments.form.validation.system_required'),
          },
        ]}
      >
        <BoatSystemSelect />
      </Form.Item>
      <Form.Item label={translate('equipments.form.labels.brand')} name="brand">
        <Input />
      </Form.Item>
      <Form.Item label={translate('equipments.form.labels.model')} name="model">
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('equipments.form.labels.serial_number')}
        name="serial_number"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('equipments.form.labels.description')}
        name="description"
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label={translate('equipments.form.labels.warranty_end_date')}
        name="warranty_end_date"
        getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
      >
        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        label={translate('equipments.form.labels.purchase_date')}
        name="purchase_date"
        getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
      >
        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        label={translate('equipments.form.labels.purchase_value')}
        name="purchase_value"
      >
        <InputNumber style={{ width: '100%' }} min={0} step={0.01} suffix="€" />
      </Form.Item>
    </Form>
  );
};

export { EquipmentForm };
