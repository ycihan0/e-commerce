import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  List,
  message,
} from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

const data = [
  {
    title: "Ant Design Title 1",
  },
];

const ContactPageList = () => {
  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id;

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
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/contacts`);

        if (response.ok) {
          const data = await response.json();
          setDatasource(data);
        } else {
          message.error("Coupon failed");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [apiUrl]);
  console.log(dataSource);

  return (
    <>
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
      <br></br>
      <Card title="Card title" bordered={true}>
        <List
          loading={loading}
          dataSource={data}
          renderItem={() => (
            <>
              {dataSource.map((contact) => (
                <List.Item key={contact._id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${contact._id}`}
                      />
                    }
                    title={
                      <a>
                        {contact.subject}, {contact.name}, {contact.email}
                      </a>
                    }
                    description={contact.message}
                  />{" "}
                </List.Item>
              ))}
            </>
          )}
        />
      </Card>
    </>
  );
};

export default ContactPageList;
