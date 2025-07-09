import { useGetIdentity } from "@refinedev/core";
import { useForm, Create } from "@refinedev/antd";
import { Form, Input } from "antd";

const AddBoat = () => {
  const { data: identity } = useGetIdentity();

  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: "boats",
    action: "create"
  });

  const handleOnFinish = (values) => {
    onFinish({
      owner_id: identity?.id,
      ...values,
    });
  };

  return (
    <div>
      <h1>Add a new boat</h1>
      <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Create>
    </div>
  );
};

export { AddBoat };
