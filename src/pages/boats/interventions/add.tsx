import { Create, useForm } from '@refinedev/antd';
import { useTranslation } from '@refinedev/core';
import { DatePicker, Form, Input } from 'antd';
import { useCurrentBoat } from '../../../hooks/use-current-boat';

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
    <div>
      <Create
        saveButtonProps={saveButtonProps}
        title={translate('AddIntervention.title')}
      >
        <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
          <Form.Item
            label={translate('AddIntervention.labels.title')}
            name="title"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={translate('AddIntervention.labels.description')}
            name="description"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={translate('AddIntervention.labels.date')}
            name="date"
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Create>
    </div>
  );
};

export { AddIntervention };
