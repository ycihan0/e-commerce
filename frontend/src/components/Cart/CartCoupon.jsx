import { message } from "antd";
import { useContext, useState } from "react";
import  { CartContext } from "../../context/CartProvider";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const { cartItems, setCartItems } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("null value cannot be entered");
    }
    try {
      const response = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!response.ok) {
        return message.warning("The coupon code you entered is incorrect");
      }
      const data = await response.json();
      const discountPercent = data.discountPercent;
      const updatedCartItems = cartItems.map((item) => {
        const updatePrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatePrice };
      });
      setCartItems(updatedCartItems);
      message.success(
        `${couponCode}% percent coupon code successfully applied `
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="coupon">
      <input
        type="text"
        className="input-text"
        placeholder="Coupon code"
        onChange={(e) => setCouponCode(e.target.value)}
        value={couponCode}
      />
      <button className="btn" type="button" onClick={applyCoupon}>
        Apply Coupon
      </button>
    </div>
  );
};

export default CartCoupon;
