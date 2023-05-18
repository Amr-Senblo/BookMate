import { useEffect, useState } from "react";
import "./Book.scss";
import StarIcon from "../../assets/svg/star.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../custom/useAuth";
import { getCookies } from "../../custom/useCookies";

import { toast } from "react-toastify";

import {
  loadingToastStyle,
  updateToSuccessToastStyle,
  updateToErrorToastStyle,
} from "../../helpers/toastStyles";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [saved, setSaved] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:6969/api/v1/user/is-saved/${bookId}`, {
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
    const toastStatus = toast.loading("Saving book...", loadingToastStyle);
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
          toast.update(toastStatus, {
            ...updateToSuccessToastStyle,
            render: "Book saved successfully!",
          });
          // toast.success("Book saved successfully!");
        });
    } catch (error) {
      console.log("error", error);
      toast.update(toastStatus, {
        ...updateToErrorToastStyle,
        render: "Failed to save book.",
      });
      // toast.error("Failed to save book.");
    }
  };

  const unSaveHandler = () => {
    // toast.info("Removing book...", toastConfig);
    const toastStatus = toast.loading("Removing book...", loadingToastStyle);
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
          // toast.success("Book removed successfully!", toastConfig);
          toast.update(toastStatus, {
            ...updateToSuccessToastStyle,
            render: "Book removed successfully!",
          });
          // toast.success("Book removed successfully!");
        });
    } catch (error) {
      console.log("error", error);
      toast.update(toastStatus, {
        ...updateToErrorToastStyle,
        render: "Failed to remove book.",
      });
      // toast.error("Failed to remove book.");
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
  }, [bookId, saved]);


  
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadFile = () => {
    setIsDownloading(true);

    axios
      .get(`http://localhost:6969/api/v1/book/download/${bookId}`, {
        headers: {
          Authorization: `Bearer ${getCookies("token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        const blob = response.data;

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", "my-file.pdf");
        link.click();
      })
      .finally(() => setIsDownloading(false));
  };

  return (
    <>
      {book ? (
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
              <button className="action-btn" onClick={downloadFile}>
                <span className="download-action-icon"></span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <LoadingCircle />
      )}
    </>
  );
};

export default Book;
