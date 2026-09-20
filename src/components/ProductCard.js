import React, { useEffect, useState } from "react";
import CoverImage from "./CoverImage";
import { platforms } from "../assets/products";
import { formatPrice } from "../lib/format";

const ProductCard = ({ product, onAdd, as: Heading = "h2" }) => {
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const handleAdd = () => {
    onAdd(product.id);
    setJustAdded(true);
  };

  return (
    <article className="product-card" data-platform={product.category}>
      <div className="product-card__cover">
        <CoverImage src={product.image} alt={`${product.title} cover art`} />
      </div>
      <div className="product-card__body">
        <span className="tag">{platforms[product.category].short}</span>
        <Heading className="product-card__title">{product.title}</Heading>
        <div className="product-card__buy">
          <span className="price">{formatPrice(product.price)}</span>
          <button type="button" className="btn" onClick={handleAdd}>
            {justAdded ? "Added" : "Add to cart"}
            <span className="sr-only"> {product.title}</span>
          </button>
        </div>
        <span className="sr-only" role="status">
          {justAdded ? `${product.title} added to cart` : ""}
        </span>
      </div>
    </article>
  );
};

export default ProductCard;
