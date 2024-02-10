import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, singleProductResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products/${productId}`),
        ]);

        if (!categoriesResponse.ok || !singleProductResponse.ok) {
          message.error("data failed");
          return;
        }
        const [categoriesData, singleProductData] = await Promise.all([
          categoriesResponse.json(),
          singleProductResponse.json(),
        ]);

        setCategories(categoriesData);

        if (singleProductData) {
          form.setFieldsValue({
            name: singleProductData.name,
            current: singleProductData.price.current,
            discount: singleProductData.price.discount,
            description: singleProductData.description,
            img: singleProductData.img.join("\n"),
            colors: singleProductData.colors.join("\n"),
            sizes: singleProductData.sizes.join("\n"),
            category: singleProductData.category,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, productId, form]);

  const onFinish = async (values) => {
    const imgLinks = values.img.split("\n").map((link) => link.trim());
    const colors = values.colors.split("\n").map((link) => link.trim());
    const sizes = values.sizes.split("\n").map((link) => link.trim());
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          colors,
          sizes,
          img: imgLinks,
        }),
      });

      if (response.ok) {
        message.success("product updated successfully");
        navigate("/admin/products");
      } else {
        message.error("product update error");
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
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateProductPage;
