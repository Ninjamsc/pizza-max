// import logo from "./logo.svg";
// import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items"></div>
          <PizzaBlock price={395} title="Чизбургер-пицца" />
          <PizzaBlock price={395} title="Чизбургер-пицца" />
          <PizzaBlock price={395} title="Чизбургер-пицца" />
          <PizzaBlock price={395} title="Чизбургер-пицца" />
        </div>
      </div>
    </div>
  );
}

export default App;
