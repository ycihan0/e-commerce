import { Button, Form, Input, Spin, message } from "antd";
import {  useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

const UpdateSliderPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const sliderId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate=useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/sliders/${sliderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("category updated successfully");
        navigate(`/admin/sliders`)
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
    const fetchSingleSlider= async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/sliders/${sliderId}`);

        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            img: data.img
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleSlider();
  }, [apiUrl, sliderId, form]);

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
          label="Slider Image Url"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input slider url.",
            },
          ]}
        >
          <Input />
        </Form.Item>

     
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateSliderPage;
