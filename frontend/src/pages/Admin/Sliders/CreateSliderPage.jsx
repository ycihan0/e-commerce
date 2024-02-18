import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useState } from "react";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("coupon created successfully");
        form.resetFields();
      } else {
        message.error("coupon creating error");
      }
    } catch (error) {
      console.log("coupon creating error:", error);
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
          label="Coupon code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input coupon code.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Discount Percent"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Please input coupon percent.",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateCouponPage;
