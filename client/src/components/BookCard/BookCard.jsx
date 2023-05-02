import PropTypes from "prop-types";
// import React from "react";
import "./BookCard.scss";

// import CheckedHeart from "../../assets/svg/checked-heart.svg";
// import UnCheckedHeart from "../../assets/svg/unchecked-heart.svg";
import StarIcon from "../../assets/svg/star.svg";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link to={`/book/id=${book.id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <div className="card-image">
          <img src={book.cover} alt={book.title} />
          <div className="rate">
            <img src={StarIcon} alt="Star Icon" className="star-icon" />
            <p className="rate-number">{` ${book.stars}`}</p>
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
  }).isRequired,
};

export default BookCard;
