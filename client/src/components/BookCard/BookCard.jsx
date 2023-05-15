import PropTypes from "prop-types";
// import React from "react";
import "./BookCard.scss";

// import CheckedHeart from "../../assets/svg/checked-heart.svg";
// import UnCheckedHeart from "../../assets/svg/unchecked-heart.svg";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link to={`/books/${book._id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <div className="card-image">
          <img src={"https://picsum.photos/200"} alt={book.title} />
          <div className="rate">
            <p className="rate-number">{` ${book.rating}`}</p>
          </div>
        </div>
        {/* <div className="card-header"> */}
        <h3>{book.title}</h3>
        {/* <span>{`by: ${book.author}`}</span> */}
        {/* </div> */}
      </div>
    </Link>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    // imageUrl: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default BookCard;
