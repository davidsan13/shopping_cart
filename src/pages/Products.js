import React, { useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useShop } from "../components/ShopContextProvider";
import { NotFound } from "./Error";
import { data, platforms } from "../assets/products";
import useDocumentTitle from "../lib/useDocumentTitle";

const platformOrder = Object.keys(platforms);

const SORTS = {
  // Grouped by platform, in the catalog's own order within each group.
  featured: {
    label: "Featured",
    compare: (a, b) => platformOrder.indexOf(a.category) - platformOrder.indexOf(b.category),
  },
  "price-asc": { label: "Price: low to high", compare: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: high to low", compare: (a, b) => b.price - a.price },
};

const Products = () => {
  const { addCart } = useShop();
  const { platformId } = useParams();
  const [sort, setSort] = useState("featured");

  const platform = platforms[platformId];
  const unknownPlatform = Boolean(platformId) && !platform;
  const heading = platform ? platform.label : "All games";
  useDocumentTitle(unknownPlatform ? "Page not found" : heading);

  const games = useMemo(() => {
    const list = platformId ? data.filter((game) => game.category === platformId) : [...data];
    return list.sort(SORTS[sort].compare);
  }, [platformId, sort]);

  if (unknownPlatform) return <NotFound />;

  return (
    <>
      <h1 className="page-title">{heading}</h1>

      <nav aria-label="Filter by platform">
        <ul className="chips">
          <li>
            <NavLink to="/products" end>
              All
            </NavLink>
          </li>
          {Object.entries(platforms).map(([slug, { label }]) => (
            <li key={slug}>
              <NavLink to={`/products/${slug}`}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="toolbar">
        <p role="status">
          {games.length} {games.length === 1 ? "game" : "games"}
        </p>
        <label className="sort">
          Sort by
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            {Object.entries(SORTS).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="product-grid">
        {games.map((game) => (
          <ProductCard key={game.id} product={game} onAdd={addCart} />
        ))}
      </div>
    </>
  );
};

export default Products;
