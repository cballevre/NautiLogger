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
    <Create
      saveButtonProps={saveButtonProps}
      title={translate('AddBoat.title')}
    >
      <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
        <Form.Item label={translate('AddBoat.labels.name')} name="name">
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};

export { AddBoat };
