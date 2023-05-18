// import React, { useState } from "react";
import "./CardContainer.css";
import BookCard from "../BookCard/BookCard";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
// import WhiteButton from "../WhiteButton/WhiteButton";
// import { Link } from "react-router-dom";
// import books from "../../data/books";
import axios from "axios";

const CardContainer = () => {
  const [books, setBooks] = useState([]);
  const [filterdBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setFilteredBooks(books);
    console.log("books beta3t amroo", books[0]);
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
        {filterdBooks.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </>
  );
};

export default CardContainer;
