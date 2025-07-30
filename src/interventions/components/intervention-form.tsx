import { useTranslation } from '@refinedev/core';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';

interface InterventionFormProps {
  formProps: any;
  handleOnFinish: (values: any) => void;
}

const InterventionForm: FC<InterventionFormProps> = ({
  formProps,
  handleOnFinish,
}) => {
  const { translate } = useTranslation();

  return (
    <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
      <Form.Item
        label={translate('interventions.form.labels.title')}
        name="title"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('interventions.form.labels.description')}
        name="description"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('interventions.form.labels.date')}
        name="date"
        getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
      >
        <DatePicker />
      </Form.Item>
    </Form>
  );
};

export { InterventionForm };
