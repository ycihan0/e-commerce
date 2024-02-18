import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("category updated successfully");
      } else {
        message.error("category updating error");
      }
    } catch (error) {
      console.log("category updating error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCoupon= async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCoupon();
  }, [apiUrl, couponId, form]);

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
        autoComplete="off"
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
          label="Discound Precent"
          name="discountPercent"
          rules={[
            {
              required: true,
              message:"Please input discound percent.",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
