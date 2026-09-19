import {
  cartReducer,
  initialCart,
  sanitizeCart,
  summarizeCart,
  MAX_QUANTITY,
} from "./cart";

const add = (cart, id) => cartReducer(cart, { type: "add", id });

describe("cartReducer", () => {
  test("adding a new product creates a line with quantity 1", () => {
    expect(add(initialCart, 8)).toEqual([{ id: 8, quantity: 1 }]);
  });

  test("adding the same product again increments its quantity", () => {
    expect(add(add(initialCart, 8), 8)).toEqual([{ id: 8, quantity: 2 }]);
  });

  test("decrease lowers the quantity", () => {
    const cart = [{ id: 8, quantity: 3 }];
    expect(cartReducer(cart, { type: "decrease", id: 8 })).toEqual([{ id: 8, quantity: 2 }]);
  });

  test("decrease at quantity 1 removes the line instead of going to 0", () => {
    const cart = [{ id: 8, quantity: 1 }, { id: 2, quantity: 1 }];
    expect(cartReducer(cart, { type: "decrease", id: 8 })).toEqual([{ id: 2, quantity: 1 }]);
  });

  test("quantity is capped", () => {
    const cart = [{ id: 8, quantity: MAX_QUANTITY }];
    expect(cartReducer(cart, { type: "increase", id: 8 })).toEqual(cart);
  });

  test("remove drops the line regardless of quantity", () => {
    const cart = [{ id: 8, quantity: 4 }];
    expect(cartReducer(cart, { type: "remove", id: 8 })).toEqual([]);
  });

  test("actions never mutate the previous state", () => {
    const cart = Object.freeze([Object.freeze({ id: 8, quantity: 1 })]);
    expect(() => add(cart, 8)).not.toThrow();
  });
});

describe("summarizeCart", () => {
  test("totals in whole cents with 8% tax", () => {
    // 19.99 x 3 = 59.97; tax 4.7976 -> 4.80; total 64.77
    const summary = summarizeCart([{ id: 2, quantity: 3 }]);
    expect(summary.count).toBe(3);
    expect(summary.subtotal).toBe(5997);
    expect(summary.tax).toBe(480);
    expect(summary.total).toBe(6477);
  });

  test("an empty cart totals zero", () => {
    expect(summarizeCart([])).toMatchObject({ count: 0, subtotal: 0, tax: 0, total: 0 });
  });
});

describe("sanitizeCart", () => {
  test("keeps valid lines and drops unknown products and bad quantities", () => {
    const saved = [
      { id: 2, quantity: 2 },
      { id: 9999, quantity: 1 },
      { id: 8, quantity: 0 },
      { id: 3, quantity: -1 },
      { id: 4, quantity: 1.5 },
      null,
    ];
    expect(sanitizeCart(saved)).toEqual([{ id: 2, quantity: 2 }]);
  });

  test("returns an empty cart for non-array data", () => {
    expect(sanitizeCart({ nope: true })).toEqual([]);
    expect(sanitizeCart(null)).toEqual([]);
  });
});
