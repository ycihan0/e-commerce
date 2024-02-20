import { useEffect, useState } from "react";
import BlogDetails from "../components/BlogDetails/BlogDetails";
import { useParams } from "react-router-dom";

const BlogDetailsPage = () => {
  const [singleBlog, setSingleBlog] = useState(null);
  const { id: blogId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/blogs/${blogId}`);

        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setSingleBlog(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleBlog();
  }, [apiUrl, blogId]);


  return singleBlog ? (
    <BlogDetails singleBlog={singleBlog} setSingleBlog={setSingleBlog} />
  ) : (
    <p>Loading Blogs...</p>
  );
};

export default BlogDetailsPage;
