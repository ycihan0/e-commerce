import Proptypes from "prop-types";
import "./CategoryItem.css"
const CategoryItem = ({category, setCategoryId}) => {

  return (
    <li className="category-item">
      <a href="#">
        <img
          src={category.img}
          alt=""
          className="category-image"
          onClick={()=>setCategoryId(category._id)}
        />
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
};

export default CategoryItem;

CategoryItem.propTypes = {
  category: Proptypes.object,  
  setCategoryId: Proptypes.func,
};

