import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  console.log(sortType);

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty;
    // replace("-", "");
    // const order = sortType.sortProperty.includes("-");
    // ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    fetch(`http://localhost:3001/items?
      ${category}
      &_sort=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  console.log(sortType);
  // &_order=${order}
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
