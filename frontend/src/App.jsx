import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import UserPage from "./pages/Admin/UserPage";
import OrderPage from "./pages/Admin/OrderPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import CouponPage from "./pages/Admin/Coupons/CouponPage";
import CreateCouponPage from "./pages/Admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/Admin/Coupons/UpdateCouponPage";
import Success from "./pages/Success";
import SliderPage from "./pages/Admin/Sliders/SliderPage";
import UpdateSliderPage from "./pages/Admin/Sliders/UpdateSliderPage";
import CreateSliderPage from "./pages/Admin/Sliders/CreateSliderPage";
import CreateBlogPage from "./pages/Admin/Blogs/CreateBlogPage";
import UpdateBlogPage from "./pages/Admin/Blogs/UpdateBlogPage";
import BlogPageList from "./pages/Admin/Blogs/BlogPageList";
import ContactPageList from "./pages/Admin/ContactPageList";
import "./App.css";
import InfoPage from "./pages/Admin/InfoPage";
import ProfilePage from "./pages/ProfilePage";
import OrderDetail from "./components/OrderDetail/OrderDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orderdetails" element={<OrderDetail />} />
      <Route path="/admin/*">
        <Route index element={<DashboardPage/>} />
        <Route path="users" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="blogs" element={<BlogPageList />} />
        <Route path="blogs/create" element={<CreateBlogPage/>} />
        <Route path="blogs/update/:id" element={<UpdateBlogPage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/create" element={<CreateCouponPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="sliders" element={<SliderPage />} />
        <Route path="sliders/create" element={<CreateSliderPage />} />
        <Route path="sliders/update/:id" element={<UpdateSliderPage />} />
        <Route path="contacts" element={<ContactPageList />} />
        <Route path="infos" element={<InfoPage />} />
         </Route>
    
    </Routes>
  );
}

export default App;
