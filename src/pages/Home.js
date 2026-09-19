import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useShop } from "../components/ShopContextProvider";
import { data, platforms } from "../assets/products";
import { formatPrice } from "../lib/format";
import useDocumentTitle from "../lib/useDocumentTitle";

const lowestPrices = [...data].sort((a, b) => a.price - b.price).slice(0, 3);

const Home = () => {
  const { addCart } = useShop();
  useDocumentTitle();

  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__text">
          <h1 id="hero-heading">Video game deals for PlayStation, Xbox and Nintendo</h1>
          <p>
            {data.length} games, starting at {formatPrice(lowestPrices[0].price)}.
          </p>
          <Link to="/products" className="btn btn--large">
            Shop all games
          </Link>
        </div>
        <ul className="platform-list">
          {Object.entries(platforms).map(([slug, platform]) => {
            const total = data.filter((game) => game.category === slug).length;
            return (
              <li key={slug}>
                <Link to={`/products/${slug}`} className="platform-link" data-platform={slug}>
                  <span className="platform-link__name">{platform.label}</span>
                  <span>{total} games</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="lowest-heading">
        <h2 id="lowest-heading" className="section-heading">
          Lowest prices
        </h2>
        <div className="product-grid">
          {lowestPrices.map((game) => (
            <ProductCard key={game.id} product={game} onAdd={addCart} as="h3" />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
