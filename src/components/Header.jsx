import React from "react";

function Header() {
  return (
    <div class="header">
      <div class="container">
        <div class="header__logo">
          <img width="38" src="img/pizza-logo.svg" alt="Pizza logo" />
          <div>
            <h1>Pizza MAX</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
        <div class="header__cart">
          <img width="18" src="img/cart.svg" alt="Cart" />
          <span>0 ₽</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
