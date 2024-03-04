import { Button, Card, Form, Input, message } from "antd";
import { useEffect } from "react";

const InfoPage = () => {
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/infos/65e5b1b0a071aaacf64f73de`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("adreses updated successfully");
      } else {
        message.error("adreses updating error");
      }
    } catch (error) {
      console.log("info updating error:", error);
    }
  };

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/infos/65e5b1b0a071aaacf64f73de`
        );

        if (response.ok) {
          const data = await response.json();
          form.setFieldsValue({
            logo: data.logo,
          });
        } else {
          message.error("Info failed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfos();
  }, [apiUrl]);

  return (
    <Card title="Adress" bordered={true}>
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
          label="Google Map Src Link"
          name="logo"
          rules={[
            {
              required: true,
              message: "Please Input Logo link.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Card>
  );
};

export default InfoPage;
