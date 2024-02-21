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
        <Link to={`${blogItem._id}`}>
          <div className="blog-info-bottom">
            <a href="#">Read More</a>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default BlogItem;
BlogItem.propTypes = {
  blogItem: Proptypes.object,
};
