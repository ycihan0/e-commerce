import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const Success = () => {
  const { setCartItems } = useContext(CartContext);
  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Payment successful"
          subTitle="Your order is completed"
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Go to Home</Button>
            </Link>,
            <Link to={"/profile"} key="home">
              <Button key="buy">My Orders</Button>
            </Link>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
