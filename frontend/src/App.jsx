import React from "react";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import "./App.css";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";

function App() {
  return (
    <React.Fragment>
      {/* <HomePage /> */}
      {/* <ShopPage /> */}
      {/* <ContactPage/> */}
      {/* <AuthPage /> */}
      {/* <CartPage/> */}
      {/* <BlogPage/> */}
      <BlogDetailsPage/>
    </React.Fragment>
  );
}

export default App;
