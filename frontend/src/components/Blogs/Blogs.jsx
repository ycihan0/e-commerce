import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import "./Blogs.css";
import { message } from "antd";

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/blogs`);

        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          message.error("Product failed");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, [apiUrl]);


  return (
    <section className="blogs">
      <div className="container">
        <div className="section-title">
          <h2>From Our Blog</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="blog-list">
          {blogs.map((blog)=>( <BlogItem key={blog._id} blogItem={blog}/>))}
         

        </ul>
      </div>
    </section>
  );
};

export default Blogs;
