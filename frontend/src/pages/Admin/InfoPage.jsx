import { Button, Card, Form, Input, Spin, Table, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

const InfoPage = () => {
  const [dataSource, setDatasource] = useState([]);
  const [form] = Form.useForm();
  const params = useParams();
  const infoId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/infos/65d7b7e580d9df61fc960eed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("adreses updated successfully");
      } else {
        message.error("adreses updating error");
      }
    } catch (error) {
      console.log("info updating error:", error);
    } 
  };




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
          name="googleSrc"
          rules={[
            {
              required: true,
              message: "Please input google map Link.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Adress Detail"
          name="adress"
          rules={[
            {
              required: true,
              message: "Please input adress.",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Card>
  );
};

export default InfoPage;
