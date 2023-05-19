// import React, { useState } from "react";
import "./SavedContainer.css";
import BookCard from "../BookCard/BookCard";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
// import WhiteButton from "../WhiteButton/WhiteButton";
// import { Link } from "react-router-dom";
// import books from "../../data/books";
import axios from "axios";
import { getCookies } from "../../custom/useCookies";

const SavedContainer = () => {
  const [books, setBooks] = useState([]);
  const [filterdBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:6969/api/v1/user/saved-books`, {
          headers: {
            Authorization: `Bearer ${getCookies("token")}`,
          },
        })
        .then((res) => {
          console.log("saved books", res.data.saved);
          setBooks(res.data.saved);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <SectionHeader
        title="Your saved books"
        data={books}
        onSearch={setFilteredBooks}
        type="book"
      />
      <div className="card-container">
        {filterdBooks.map(
          (book, index) => book && <BookCard key={index} book={book} />
        )}
      </div>
    </>
  );
};

export default SavedContainer;
