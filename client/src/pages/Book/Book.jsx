import React, { useEffect, useState } from "react";
import "./Book.scss";
import CheckedHeart from "../../assets/svg/checked-heart.svg";
import UnCheckedHeart from "../../assets/svg/unchecked-heart.svg";
import Download from "../../assets/svg/download.svg";
import StarIcon from "../../assets/svg/star.svg";
import SavedIcon from "../../assets/svg/saved.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../custom/useAuth";
import { getCookies } from "../../custom/useCookies";

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [saved, setSaved] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    console.log("auth.user.token from book", auth.user);
    try {
      axios
        .get(`http://localhost:6969/api/v1/user/is-saved/`, {
          data: { bookId },
          headers: {
            Authorization: `Bearer ${getCookies("token")}`,
          },
        })
        .then((res) => {
          console.log("res.data", res.data);
          console.log("res.data.isSaved", res.data.isSaved);
          setSaved(res.data.isSaved);
        });
    } catch (error) {
      console.log("error", error);
    }
  }, [saved]);

  const saveHandler = () => {
    try {
      axios
        .post(
          `http://localhost:6969/api/v1/user/save-book`,
          { bookId },
          {
            headers: {
              Authorization: `Bearer ${getCookies("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("res.data", res.data);
          setSaved(true);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const unSaveHandler = () => {
    try {
      axios
        .post(
          `http://localhost:6969/api/v1/user/unsave-book`,
          { bookId },
          {
            headers: {
              Authorization: `Bearer ${getCookies("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("res.data", res.data);
          setSaved(false);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    try {
      axios.get(`http://localhost:6969/api/v1/book/${bookId}`).then((res) => {
        console.log("res.data", res.data);
        setBook(res.data.book);
      });
    } catch (error) {
      console.log("error", error);
      if (error.response.status === 404) {
        console.log("Book not found");
      } else if (error.response.status === 401) {
        console.log("Unauthorized");
      }
    }
  }, [bookId]);

  return (
    <>
      {book && (
        <div className="book-card">
          <div className="book-image">
            <img src={book.imageUrl} alt={book.title} />
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
                <p className="rate-number">{` ${book.rating}`}</p>
              </div>
              <button className="book-category-box">
                <p className="book-category">{book.category}</p>
              </button>
            </div>
            <div className="book-actions">
              {saved ? (
                <button className="action-btn" onClick={unSaveHandler}>
                  <span className="un-star-action-icon"></span>
                </button>
              ) : (
                <button className="action-btn" onClick={saveHandler}>
                  <span className="star-action-icon"></span>
                </button>
              )}
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
