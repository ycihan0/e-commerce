import Proptypes from "prop-types";
import "./BlogItem.css";
import { Link } from "react-router-dom";

const BlogItem = ({ blogItem }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(blogItem.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );

  return (
    <li className="blog-item">
      <a href="#" className="blog-image">
        <img src={blogItem.img} alt="" />
      </a>
      <div className="blog-info">
        <div className="blog-info-top">
          <span>{formattedDate} </span>-
          <span>{blogItem.reviews.length} Comments</span>
        </div>
        <div className="blog-info-center">
          <a href="#">Aliquam hendrerit mi metus</a>
        </div>

        <div className="blog-info-bottom">
          <Link to={`${blogItem._id}`}>Read More</Link>
        </div>
      </div>
    </li>
  );
};

export default BlogItem;
BlogItem.propTypes = {
  blogItem: Proptypes.object,
};
