import { message } from "antd";
import { useEffect, useState } from "react";
import ProductItem from "../Products/ProductItem";
import "./ProductList.css";

const ProductList = ({categoryId}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Product failed");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
   
  }, [apiUrl]);
 
  useEffect(() => {
    if (categoryId !== "") {
      // Eğer bir kategori seçildiyse filtreleme işlemi yap
      const filtered = products.filter((product) => product.category === categoryId);
      setFilteredProducts(filtered);
    } else {
      // Eğer kategori seçimi yoksa tüm ürünleri göster
      setFilteredProducts(products);
    }
  }, [categoryId, products]);
console.log(categoryId)
  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>New Arrivals</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel2">
          <div className="glide__track">
            <div className="product-list glide__slides">
              {filteredProducts.map((product) => (
                <ProductItem productItem={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
