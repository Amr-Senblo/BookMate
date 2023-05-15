import "./CategoriesContainer.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useEffect, useState } from "react";

import axios from "axios";
import tempCategories from "../../data/categories";
import CategoryCard from "../CategoryCard/CategoryCard";

const CategoriesContainer = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:6969/api/v1/categories`, {
          withCredentials: true,
        })
        .then((res) => {
          setCategories(res.data.categories);
        });
    } catch (error) {
      console.log(error);
    }
    // setCategories(tempCategories);
    // console.log(tempCategories);
  }, []);

  return (
    <>
      <SectionHeader title="Categories" />
      <div className="categories-container">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </>
  );
};

export default CategoriesContainer;
