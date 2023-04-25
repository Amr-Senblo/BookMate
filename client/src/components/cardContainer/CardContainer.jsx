// import React, { useState } from "react";
import "./CardContainer.css";
import BookCard from "../BookCard/BookCard";
// import WhiteButton from "../WhiteButton/WhiteButton";
// import { Link } from "react-router-dom";

const books = [
  {
    title: "The Great Gatsby",
    cover: "https://via.placeholder.com/100",
    loves: 10,
    author: "Harby",
  },
  {
    title: "To Kill a Mockingbird",
    cover: "https://via.placeholder.com/120",
    loves: 5,
    author: "Harby",
  },
  {
    title: "Pride and Prejudice",
    cover: "https://via.placeholder.com/50",
    loves: 15,
    author: "Harby",
  },
  {
    title: "Pride and Prejudice",
    cover: "https://via.placeholder.com/220",
    loves: 15,
    author: "Harby",
  },
  {
    title: "Pride and Prejudice",
    cover: "https://via.placeholder.com/150",
    loves: 15,
    author: "Harby",
  },
  {
    title: "Pride and Prejudice",
    cover: "https://dummyimage.com/50x260/",
    loves: 15,
    author: "Harby",
  },
];

const CardContainer = () => {
  return (
    <>
      <div className="card-container">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </>
  );
};

export default CardContainer;
