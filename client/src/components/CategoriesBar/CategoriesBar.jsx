// import React from "react";
import "./CategoriesBar.css";

const categories = [
  {
    id: 1,
    title: "Category 1",
    sections: [
      { id: 1, title: "Section 1.1" },
      { id: 2, title: "Section 1.2" },
      { id: 3, title: "Section 1.3" },
    ],
  },
  {
    id: 2,
    title: "Category 2",
    sections: [
      { id: 1, title: "Section 2.1" },
      { id: 2, title: "Section 2.2" },
    ],
  },
  {
    id: 3,
    title: "Category 3",
    sections: [{ id: 1, title: "Section 3.1" }],
  },
  {
    id: 4,
    title: "Category 4",
    sections: [{ id: 1, title: "Section 4.1" }],
  },
  {
    id: 5,
    title: "Category 5",
    sections: [{ id: 1, title: "Section 5.1" }],
  },
];

const CategoriesBar = () => {
  return (
    <div className="categoriesBar">
      {categories.map((category) => (
        <div className="categoryDropdown" key={category.id}>
          <div className="categoryTitle">{category.title}</div>
          <div className="sectionList">
            {category.sections.map((section) => (
              <div className="sectionItem" key={section.id}>
                {section.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesBar;
