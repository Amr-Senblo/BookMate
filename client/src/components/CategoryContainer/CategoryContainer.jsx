import "./CategoryContainer.css";
import BookCard from "../BookCard/BookCard";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { useParams } from "react-router-dom";

const CategoryContainer = () => {
  const [books, setBooks] = useState([]);
  const [filterdBooks, setFilteredBooks] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:6969/api/v1/category/${categoryId}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("res.data.category", res.data.category);
          setBooks(res.data.category.books);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <SectionHeader
        title="Category books"
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

export default CategoryContainer;
