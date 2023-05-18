import "./CategoriesContainer.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useEffect, useState } from "react";

import axios from "axios";
import tempCategories from "../../data/categories";
import CategoryCard from "../CategoryCard/CategoryCard";

const CategoriesContainer = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:6969/api/v1/category`, {
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
      <SectionHeader
        title="Categories"
        data={categories}
        onSearch={setFilteredCategories}
        type="category"
      />
      <div className="categories-container">
        {filteredCategories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </>
  );
};

export default CategoriesContainer;
