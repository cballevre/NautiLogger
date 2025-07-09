import { Create, useForm } from '@refinedev/antd';
import { useGetIdentity, useTranslation } from '@refinedev/core';
import { Form, Input } from 'antd';

const AddBoat = () => {
  const { data: identity } = useGetIdentity<{ id: string }>();

  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: 'boats',
    action: 'create',
  });

  const handleOnFinish = (values: {}) => {
    onFinish({
      owner_id: identity?.id,
      ...values,
    });
  };

  const { translate } = useTranslation();

  return (
    <div>
      <h1>{translate('AddBoat.title')}</h1>
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
          <Form.Item label={translate('AddBoat.labels.name')} name="name">
            <Input />
          </Form.Item>
        </Form>
      </Create>
    </div>
  );
};

export { AddBoat };
