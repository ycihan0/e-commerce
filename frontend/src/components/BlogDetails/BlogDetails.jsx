import Proptypes from "prop-types";
import "./BlogDetails.css";
import ReviewsBlog from "../ReviewsBlog/ReviewsBlog";

const BlogDetails = ({ singleBlog, setSingleBlog }) => {
  const activeTab = "desc";
  return (
    <section className="single-blog">
      <div className="container">
        <article>
          <figure>
            <a href="#">
              <img src={singleBlog.img} alt="" />
            </a>
          </figure>
          <div className="blog-wrapper">
            <div className="blog-meta">
              <div className="blog-category">
                <a href="#">{singleBlog.blogCategory}</a>
              </div>
              <div className="blog-date">
                <a href="#">April 25, 2022</a>
              </div>
              <div className="blog-tags">
                {singleBlog.blogTags.map((blogTag, index) => (
                  <a href="#" key={index}>
                    {blogTag}{" "}
                  </a>
                ))}
              </div>
            </div>
            <h1 className="blog-title">{singleBlog.title}</h1>

            <p
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: singleBlog.description }}
            ></p>
          </div>
        </article>
        <ReviewsBlog singleProduct={singleBlog} setSingleProduct={setSingleBlog} active={activeTab}/>
      </div>
    </section>
  );
};

export default BlogDetails;

BlogDetails.propTypes = {
  singleBlog: Proptypes.object,
  setSingleBlog: Proptypes.func,
};
