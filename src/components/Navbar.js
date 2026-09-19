import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useShop } from "./ShopContextProvider";

const Navbar = () => {
  const { count } = useShop();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">
          Game Central
        </Link>
        <nav aria-label="Main">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                Cart
                {count > 0 && (
                  <>
                    <span className="cart-count" aria-hidden="true">
                      {count}
                    </span>
                    <span className="sr-only">
                      {" "}
                      ({count} {count === 1 ? "item" : "items"})
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
