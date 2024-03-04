import { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  });

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const userOrders = orders.filter(
    (order) => order.receipt_email === user.email
  );

  const onFinish = async () => {
    if (formData.newPassword !== formData.newPasswordAgain) {
      message.error("New passwords do not match");

      return;
    }
    try {
      // Kullanıcının şifresini güncelleme endpoint'i
      const response = await fetch(`${apiUrl}/api/users/${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        message.success("Password updated successfully");
      }
    } catch (error) {
      console.error("Password update failed:", error);
      message.error("Password update failed");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          ` https://api.stripe.com/v1/payment_intents`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}` },
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          setOrders(data);
        } else {
          message.error("Orders failed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [MY_STRIPE_SECRET_KEY]);
  const goToAdmin = () => {
    window.location.href = "/admin";
  };
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="left-column">
          <img src={user.avatar} className="avatar" />
          <div className="user-info">
            <h2>User Information</h2>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
            {user.role === "admin" ? (
              <Button onClick={goToAdmin} type="primary" htmlType="submit">
                Admin Panel
              </Button>
            ) : (
              ""
            )}
            <div style={{ maxWidth: "600px", margin: "auto" }}>
              <br></br>
              <h3>Change Password</h3>
              <br></br>
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ email: "user@example.com" }}
              >
                <Form.Item
                  label="Old Password"
                  name="oldPassword"
                  rules={[
                    { required: true, message: "Enter your old password" },
                  ]}
                >
                  <Input.Password
                    name="oldPassword"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: "Enter a new password" }]}
                >
                  <Input.Password
                    name="newPassword"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item
                  label="New Password Again"
                  name="newPasswordAgain"
                  rules={[{ required: true, message: "Enter a new password" }]}
                >
                  <Input.Password
                    name="newPasswordAgain"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="right-column">
          <h2>My Orders</h2>
          {userOrders.length === 0 ? (
            <div className="no-order-found">No order found</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Total Price</th>
                  <th>Detail</th>
                </tr>
              </thead>
              {userOrders.map((userOrder) => (
                <tbody key={userOrder.id}>
                  <tr>
                    <td>{userOrder.created}</td>
                    <td>$ {userOrder.amount / 100}</td>
                    <td style={{ textAlign: "center" }}>
                      <Link
                        to={"/orderdetails"}
                        className="btn btn-primary btn-sm"
                      >
                        show
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
