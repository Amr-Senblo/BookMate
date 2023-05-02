import React, { useEffect, useState } from "react";
import "./Book.scss";
import CheckedHeart from "../../assets/svg/checked-heart.svg";
import UnCheckedHeart from "../../assets/svg/unchecked-heart.svg";
import Download from "../../assets/svg/download.svg";
import StarIcon from "../../assets/svg/star.svg";
import SavedIcon from "../../assets/svg/saved.svg";
import { useParams } from "react-router-dom";
import books from "../../data/books";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const book = books.find((book) => book.id === Number(id));
    setBook(book);
  }, [id]);

  return (
    <>
      {book && (
        <div className="book-card">
          <div className="book-image">
            <img src={book.cover} alt={book.title} />
          </div>
          <div className="book-details">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">{book.author}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                gap: "1rem",
              }}
            >
              <div className="rate">
                <img src={StarIcon} alt="Star Icon" className="star-icon" />
                <p className="rate-number">{` ${book.stars}`}</p>
              </div>
              <button className="book-category-box">
                <p className="book-category">{book.category}</p>
              </button>
            </div>
            <div className="book-actions">
              <button className="action-btn">
                <span className="star-action-icon"></span>
              </button>
              {/* <button className="action-btn">
            <span className="un-star-action-icon"></span>
          </button> */}
              <button className="action-btn">
                <span className="download-action-icon"></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
