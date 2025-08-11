import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
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
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&title_like=${searchValue}` : "";

    fetch(
      `http://localhost:3001/items?_page=${currentPage}&_per_page=8${category}&_sort=${sortBy}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        console.log(data);
        setItems(data.data);
        setPageCount(data.pages);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage, pageCount]);

  const pizzas = items
    .filter((data) => {
      if (data.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((data) => <PizzaBlock key={data.id} {...data} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination
        onChangePage={(number) => setCurrentPage(number)}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Home;
