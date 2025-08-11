import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

// import pizzas from "./assets/pizzas.json";
// import axios from "axios";

export const SearchContext = React.createContext("");

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  const path = window.location.pathname;
  if (path === "/404") {
    return <NotFound />;
  }

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
