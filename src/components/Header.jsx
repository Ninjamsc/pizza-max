import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img width="38" src="img/pizza-logo.svg" alt="Pizza logo" />
          <div>
            <h1>Pizza MAX</h1>
            <p>самая вкусная пицца на Селигере</p>
          </div>
        </div>
        <div className="header__cart">
          <img width="18" src="img/cart.svg" alt="Cart" />
          <span> 0 ₽</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
