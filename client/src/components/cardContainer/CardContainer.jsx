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
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:6969/api/v1/books`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setBooks(res.data.books);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <SectionHeader title="Explore" />
      <div className="card-container">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </>
  );
};

export default CardContainer;
