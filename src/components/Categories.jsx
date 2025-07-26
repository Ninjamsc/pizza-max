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
          <li
            onClick={() => onClickCategory()}
            className={activeIndex === 1 ? "active" : ""}
          >
            Мясные
          </li>
          <li
            onClick={() => onClickCategory()}
            className={activeIndex === 2 ? "active" : ""}
          >
            Вегетарианские
          </li>
          <li
            onClick={() => onClickCategory()}
            className={activeIndex === 3 ? "active" : ""}
          >
            Гриль
          </li>
          <li
            onClick={() => onClickCategory()}
            className={activeIndex === 4 ? "active" : ""}
          >
            Острые
          </li>
          <li
            onClick={() => onClickCategory()}
            className={activeIndex === 5 ? "active" : ""}
          >
            Закрытые
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Categories;
