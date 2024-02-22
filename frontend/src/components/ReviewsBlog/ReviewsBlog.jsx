import ReviewItem from "../Reviews/ReviewItem";
import Proptypes from "prop-types";
import "../Reviews/Reviews";
import { useEffect, useState } from "react";
import { message } from "antd";
import ReviewFormBlog from "./ReviewFormBlog";

const ReviewsBlog = ({  singleBlog, setSingleBlog }) => {
  const [users, setUsers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const thisReview = [];
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          message.error("Users failed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [apiUrl]);
  singleBlog && singleBlog.reviews.forEach((review) => {
    const matchingUsers = users?.filter((user) => user._id === review.user);

    matchingUsers.forEach((matchingUser) => {
      thisReview.push({
        review: review,
        user: matchingUser,
      });
    });
  });
  return (
    <div className={`tab-panel-reviews`}>
      {singleBlog && singleBlog.reviews.length > 0 ? (
        <>
          <h3>{singleBlog.reviews.length} reviews for {singleBlog.title}</h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReview.map((item, index) => (
                <ReviewItem key={index} item={item} reviewItem={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>There are no comments. Be the first to comment</h3>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewFormBlog
          singleBlog={singleBlog}
          setSingleBlog={setSingleBlog}
        />
      </div>
    </div>
  );
};

export default ReviewsBlog;

ReviewsBlog.propTypes = {
  singleBlog: Proptypes.object,
  setSingleBlog: Proptypes.func,
};
