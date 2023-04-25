import React from "react";
import "./Book.css";
import CheckedHeart from "../../assets/svg/checked-heart.svg";
import UnCheckedHeart from "../../assets/svg/unchecked-heart.svg";
import Download from "../../assets/svg/download.svg";

const book = {
  title: "The Alchemist",
  author: "Paulo Coelho",
  description:
    "plaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplaplapla",
  genre: "Fantasy",
  cover: "https://via.placeholder.com/100",
  loves: 10,
};

const Book = () => {
  return (
    <div className="book-card">
      <div className="book-image">
        <img src={book.cover} alt={book.title} />
      </div>
      <div className="book-details">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">{book.author}</p>
        <p className="book-description">{book.description}</p>
        <p className="book-genre">{book.genre}</p>
        <div className="book-actions">
          <img
            src={UnCheckedHeart}
            alt="Checked Heart"
            style={{
              width: "25px",
            }}
          />
          <img
            src={Download}
            alt="Checked Heart"
            style={{
              width: "25px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Book;
