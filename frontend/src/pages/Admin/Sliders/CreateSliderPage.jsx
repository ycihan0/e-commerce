import { Button, Form, Input,  Spin, message } from "antd";
import { useState } from "react";

const CreateSliderPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/sliders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("slider created successfully");
        form.resetFields();
      } else {
        message.error("slider creating error");
      }
    } catch (error) {
      console.log("slider creating error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Image Url"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input coupon code.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateSliderPage;
