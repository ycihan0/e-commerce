import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Categories failed");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const onFinish = async (values) => {
    const imgLinks = values.img.split("\n").map((link) => link.trim());
    const colors = values.colors.split("\n").map((link) => link.trim());
    const sizes = values.sizes.split("\n").map((link) => link.trim());
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price:{
            current:values.current,
            discount:values.discount
          },
          colors,
          sizes,
          img:imgLinks
        }),
      });

      if (response.ok) {
        message.success("product created successfully");
        form.resetFields();
      } else {
        message.error("product creating error");
      }
    } catch (error) {
      console.log("product updating error:", error);
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
          label="product name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select 1 category",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
             <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="price"
          name="current"
          rules={[
            {
              required: true,
              message: "Please input product price.",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="discount rate"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input product discount rate.",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="product description"
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
        <Form.Item
          label="Product Images (Links)"
          name="img"
          rules={[
            {
              required: true,
              message: "Enter at least 4 product image links.",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Write each image link on a new line."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Product Colors (RGB codes)"
          name="colors"
          rules={[
            {
              required: true,
              message: "enter at least 1 product color",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Write each RGB code on a new line."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Product sizes"
          name="sizes"
          rules={[
            {
              required: true,
              message: "enter at least 4 product size",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Write each product size on a new line."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
