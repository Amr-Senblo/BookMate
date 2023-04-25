import PropTypes from "prop-types";
// import React from "react";
import "./BookCard.css";

import CheckedHeart from "../../assets/svg/checked-heart.svg";
// import UnCheckedHeart from "../../assets/svg/unchecked-heart.svg";

const BookCard = ({ book }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={book.cover} alt={book.title} />
      </div>
      <h3>{book.title}</h3>
      <span>{`by: ${book.author}`}</span>
      <p>
        <img
          src={CheckedHeart}
          alt="Checked Heart"
          style={{
            width: "17px",
          }}
        />
        <span
          style={{ fontWeight: 380, fontSize: "1rem" }}
        >{` ${book.loves} likes`}</span>
      </p>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    loves: PropTypes.number.isRequired,
  }).isRequired,
};

export default BookCard;
