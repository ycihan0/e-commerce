import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import Proptypes from "prop-types";
import "./Reviews.css";

const Reviews = ({ active, singleProduct }) => {
  return (
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {singleProduct.reviews.map((item, index) => (
                <ReviewItem key={index} item={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>There are no comments. Be the first to comment</h3>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm />
      </div>
    </div>
  );
};

export default Reviews;

Reviews.propTypes = {
  active: Proptypes.string,
  singleProduct: Proptypes.object,
};
