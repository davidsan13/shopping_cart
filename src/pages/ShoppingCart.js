import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../components/ShopContextProvider";
import { platforms } from "../assets/products";
import { formatCents, formatPrice } from "../lib/format";
import { TAX_RATE } from "../lib/cart";
import useDocumentTitle from "../lib/useDocumentTitle";

const ShoppingCart = () => {
  const { lines, count, subtotal, tax, total, increaseQty, decreaseQty, removeItem } = useShop();
  useDocumentTitle("Cart");

  if (lines.length === 0) {
    return (
      <div className="empty-state">
        <h1 className="page-title">Your cart is empty</h1>
        <p>Add a game and it will show up here.</p>
        <Link to="/products" className="btn btn--large">
          Browse games
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-title">Your cart</h1>
      <div className="cart-layout">
        <ul className="cart-list">
          {lines.map(({ product, quantity, lineTotal }) => (
            <li key={product.id} className="cart-line" data-platform={product.category}>
              <div className="cart-line__cover">
                <img src={product.image} alt="" loading="lazy" />
              </div>
              <div className="cart-line__info">
                <h2 className="cart-line__title">{product.title}</h2>
                <p className="cart-line__meta">
                  <span className="tag">{platforms[product.category].short}</span>
                  {formatPrice(product.price)} each
                </p>
                <div className="cart-line__controls">
                  <div className="stepper" role="group" aria-label={`Quantity of ${product.title}`}>
                    <button
                      type="button"
                      onClick={() => decreaseQty(product.id)}
                      aria-label={`Decrease quantity of ${product.title}`}
                    >
                      −
                    </button>
                    <span aria-live="polite">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseQty(product.id)}
                      aria-label={`Increase quantity of ${product.title}`}
                    >
                      +
                    </button>
                  </div>
                  <button type="button" className="link-button" onClick={() => removeItem(product.id)}>
                    Remove<span className="sr-only"> {product.title}</span>
                  </button>
                </div>
              </div>
              <p className="cart-line__total">{formatCents(lineTotal)}</p>
            </li>
          ))}
        </ul>

        <aside className="summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <dl>
            <div>
              <dt>
                Subtotal ({count} {count === 1 ? "item" : "items"})
              </dt>
              <dd>{formatCents(subtotal)}</dd>
            </div>
            <div>
              <dt>Estimated tax ({Math.round(TAX_RATE * 100)}%)</dt>
              <dd>{formatCents(tax)}</dd>
            </div>
            <div className="summary__total">
              <dt>Estimated total</dt>
              <dd>{formatCents(total)}</dd>
            </div>
          </dl>
          <Link to="/products" className="btn btn--outline">
            Continue shopping
          </Link>
        </aside>
      </div>
    </>
  );
};

export default ShoppingCart;
