import { Button, Form, Input,Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const UpdateBlogPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const blogId = params.id;

  useEffect(() => {
    const fetchSingleBlog= async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/blogs/${blogId}`);

        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            img: data.img,
             blogCategory:data.blogCategory,
             blogTags:data.blogTags,
             title:data.title,
            description:data.description
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleBlog();
  }, [apiUrl, blogId, form]);

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("blog updated successfully");
        navigate(`/admin/blogs`)
      } else {
        message.error("blog updating error");
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
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateBlogPage;
