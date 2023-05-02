// import React, { useState } from "react";
import "./CardContainer.css";
import BookCard from "../BookCard/BookCard";
import SectionHeader from "../SectionHeader/SectionHeader";
// import WhiteButton from "../WhiteButton/WhiteButton";
// import { Link } from "react-router-dom";
import books from "../../data/books";

const CardContainer = () => {
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
