import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <div className="container">
        <ul>
          <li
            onClick={() => onClickCategory()}
            className={activeIndex === 0 ? "active" : ""}
          >
            Все
          </li>
          <li className={activeIndex === 1 ? "active" : ""}>Мясные</li>
          <li className={activeIndex === 2 ? "active" : ""}>Вегетарианские</li>
          <li className={activeIndex === 3 ? "active" : ""}>Гриль</li>
          <li className={activeIndex === 4 ? "active" : ""}>Острые</li>
          <li className={activeIndex === 5 ? "active" : ""}>Закрытые</li>
        </ul>
      </div>
    </div>
  );
}

export default Categories;
