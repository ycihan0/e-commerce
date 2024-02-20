import Proptypes from "prop-types";
import "./BlogItem.css";

const BlogItem = ({ blogItem }) => {
  console.log(blogItem)
  const { review } = blogItem;
  const {  createdAt } = review;
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(createdAt).toLocaleDateString(
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
          <span>{formattedDate} </span>-<span>0 Comments</span>
        </div>
        <div className="blog-info-center">
          <a href="#">Aliquam hendrerit mi metus</a>
        </div>
        <div className="blog-info-bottom">
          <a href="#">Read More</a>
        </div>
      </div>
    </li>
  );
};

export default BlogItem;
BlogItem.propTypes = {
  blogItem: Proptypes.object,
};