import { Form, Input, message } from "antd";
import "./Contact.css";
import { useEffect, useState } from "react";

const Contact = () => {
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [adress, setAdress] = useState([]);

  useEffect(() => {
    const fetchAdress = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/infos`);

        if (response.ok) {
          const data = await response.json();
          setAdress(data);
        } else {
          message.error("Product failed");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdress();
  }, [apiUrl]);

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("your message has been sent");
        form.resetFields();
      } else {
        message.error("There was an error sending your message");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="contact">
      <div className="contact-top">
        <div className="contact-map">
          <iframe
            src={adress[0].googleSrc}
            width="100%"
            height="500"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="contact-bottom">
        <div className="container">
          <div className="contact-titles">
            <h4>Contact with us</h4>
            <h2>Get In Touch</h2>
            <p>
              In hac habitasse platea dictumst. Pellentesque viverra sem nec
              orci lacinia, in bibendum urna mollis. Quisque nunc lacus, varius
              vel leo a, pretium lobortis metus. Vivamus consectetur consequat
              justo.
            </p>
          </div>
          <div className="contact-elements">
            <Form
              form={form}
              className="contact-form"
              name="basic"
              onFinish={onFinish}
              layout="vertical"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                label="Your Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Enter your name.",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>
              <Form.Item
                label="Your email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Enter your email.",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Subject"
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Enter a subject.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Your Message"
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Enter your message.",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <button className="btn btn-sm form-button">Send Message</button>
            </Form>
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <p
                    className="product-description"
                    dangerouslySetInnerHTML={{
                      __html: adress[0].adress,
                    }}
                  ></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong> Opening Hours</strong>
                  <p className="contact-date">Monday - Friday : 9am - 5pm</p>
                  <p>Weekend Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
