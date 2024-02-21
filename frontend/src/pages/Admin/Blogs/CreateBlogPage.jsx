import { Button, Form, Input, Spin, message } from "antd";
import {useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlogPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;



  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("blog created successfully");
        form.resetFields();
      } else {
        message.error("blog creating error");
      }
    } catch (error) {
      console.log("blog updating error:", error);
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
          label="Blog Images (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Enter blog a image link.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Blog Category"
          name="blogCategory"
          rules={[
            {
              required: true,
              message: "Please input blog category",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Blog Tags"
          name="blogTags"
          rules={[
            {
              required: true,
              message: "Write blog tags with a comma between them.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Blog Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Enter blog a title.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Blog description"
          name="description"
          rules={[
            {
              required: true,
              message: "enter a product description.",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateBlogPage;
