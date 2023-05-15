import "./CategoryCard.css";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/id=${category._id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="category-card">
        <div className="category-name">{category.name}</div>
        <div className="books-count">
          <span className="books-count-icon"></span>
          {category.books.length}
          {category.books.length === 1 ? " Book" : " Books"}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

CategoryCard.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
