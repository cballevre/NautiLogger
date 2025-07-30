import { Create, useForm } from '@refinedev/antd';
import { useGetIdentity, useTranslate } from '@refinedev/core';
import { Form, Input } from 'antd';

import { PageLayout } from '@/shared/components/page-layout';

const AddBoat = () => {
  const { data: identity } = useGetIdentity<{ id: string }>();

  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: 'boats',
    action: 'create',
  });

  const handleOnFinish = (values: {}) => {
    onFinish({
      created_by: identity?.id,
      ...values,
    });
  };

  const translate = useTranslate();

  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export { AddBoat };
