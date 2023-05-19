// import React, { useState } from "react";
import "./CardContainer.css";
import BookCard from "../BookCard/BookCard";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
// import WhiteButton from "../WhiteButton/WhiteButton";
// import { Link } from "react-router-dom";
// import books from "../../data/books";
import axios from "axios";
import LoadingCircle from "../LoadingCircle/LoadingCircle";

const CardContainer = () => {
  const [books, setBooks] = useState([]);
  const [filterdBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:6969/api/v1/book`, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res);
          setBooks(res.data.books);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <SectionHeader
        title="Explore"
        data={books}
        onSearch={setFilteredBooks}
        type="book"
      />
      <div className="card-container">
        {books ? (
          filterdBooks.map(
            (book, index) => book && <BookCard key={index} book={book} />
          )
        ) : (
          <LoadingCircle />
        )}
      </div>
    </>
  );
};

export default CardContainer;
