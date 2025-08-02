import React from "react";

function Categories({ value, onChangeCategory }) {
  // const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // };

  return (
    <div className="categories">
      <div className="container">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              onClick={() => onChangeCategory(index)}
              className={value === index ? "active" : ""}
              key={index}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
