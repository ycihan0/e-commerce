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
import "./App.css";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";

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
      <Route path="/admin/*">
        <Route path="users" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
