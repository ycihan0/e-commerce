import { useEffect, useState } from "react";
import "./Profile.css";
import { message } from "antd";
const Profile = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataUser, setDataUser] = useState([]);
  const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

  // console.log(user.id);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/api/users`);

  //       if (response.ok) {
  //         const data = await response.json();
  //         setDataUser(data);
  //       } else {
  //         message.error("Hero failed");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchUsers();
  // }, [apiUrl]);
//   const user = {
//     username: "john_doe",
//     email: "john.doe@example.com",
//     profileImage: "path/to/profile-image.jpg",
//     password: "securepassword",
//   };
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(false);
const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;


useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(` https://api.stripe.com/v1/payment_intents`,{
        method: "GET",
        headers: {Authorization:`Bearer ${MY_STRIPE_SECRET_KEY}`}
      });

      if (response.ok) {
        const {data} = await response.json();
        setOrders(data);
      } else {
        message.error("Orders failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }; 
  fetchData();
}, [MY_STRIPE_SECRET_KEY]);

const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};
const userOrders = orders.filter(order => order.receipt_email === user.email);
console.log(userOrders)
return (
  <div className="profile-page">
    <div className="profile-card">
      <div className="left-column">
       <img src={user.avatar} className="avatar"/>
        <div className="user-info">
          <h2>User Information</h2>
          <p>Name: john</p>
          <p>Email: john.doe@example.com</p>
        </div>
      </div>
      <div className="right-column">
        <h2>My Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Product A</td>
              <td>2</td>
              <td>$50.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Product B</td>
              <td>1</td>
              <td>$30.00</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default Profile;
