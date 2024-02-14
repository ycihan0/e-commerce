import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import "./Cart.css";
import CartCoupon from "./CartCoupon";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";
const Cart = () => {
  const { cartItems, addToCart } = useContext(CartContext);
  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <CartProgress />
              <div className="shop-table-wrapper">
                <CartTable />
                <div className="actions-wrapper">
                  <CartCoupon />
                  <div className="update-cart">
                    <button className="btn">Update Cart</button>
                  </div>
                </div>
              </div>
            </form>
            <div className="cart-collaterals">
              <CartTotals />
            </div>
          </div>
        ) : (
          <h2>There are no items in your cart.</h2>
        )}
      </div>
    </section>
  );
};

export default Cart;
