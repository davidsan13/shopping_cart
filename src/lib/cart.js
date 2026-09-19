import { getProduct } from "../assets/products";

export const TAX_RATE = 0.08;
export const MAX_QUANTITY = 99;

// The cart only stores { id, quantity }. Names and prices are looked up from the
// catalog, so a saved cart can never show a stale price.
export const initialCart = [];

export function cartReducer(cart, action) {
  switch (action.type) {
    case "add":
    case "increase": {
      const id = action.id;
      if (!cart.some((line) => line.id === id)) {
        return [...cart, { id, quantity: 1 }];
      }
      return cart.map((line) =>
        line.id === id
          ? { ...line, quantity: Math.min(line.quantity + 1, MAX_QUANTITY) }
          : line
      );
    }
    case "decrease":
      // Going below 1 removes the line instead of leaving a 0 or negative quantity.
      return cart.flatMap((line) => {
        if (line.id !== action.id) return [line];
        return line.quantity > 1 ? [{ ...line, quantity: line.quantity - 1 }] : [];
      });
    case "remove":
      return cart.filter((line) => line.id !== action.id);
    case "clear":
      return initialCart;
    default:
      return cart;
  }
}

// Drops anything unusable from saved data (unknown products, bad quantities).
export function sanitizeCart(saved) {
  if (!Array.isArray(saved)) return initialCart;
  return saved
    .filter(
      (line) =>
        line &&
        getProduct(line.id) &&
        Number.isInteger(line.quantity) &&
        line.quantity > 0
    )
    .map((line) => ({
      id: line.id,
      quantity: Math.min(line.quantity, MAX_QUANTITY),
    }));
}

const toCents = (price) => Math.round(price * 100);

// Joins cart lines with the catalog and totals everything in whole cents,
// so amounts like 19.99 * 3 never pick up floating-point noise.
export function summarizeCart(cart) {
  const lines = cart.map(({ id, quantity }) => {
    const product = getProduct(id);
    return { product, quantity, lineTotal: toCents(product.price) * quantity };
  });
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  return { lines, count, subtotal, tax, total: subtotal + tax };
}
