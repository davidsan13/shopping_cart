import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { cartReducer, sanitizeCart, summarizeCart, initialCart } from "../lib/cart";

const STORAGE_KEY = "game-central-cart";

const ShopContext = createContext(null);

function loadCart() {
  try {
    return sanitizeCart(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return initialCart; // storage blocked or the saved value is corrupt
  }
}

export function ShopContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Private mode or a full quota: the cart still works, it just won't persist.
    }
  }, [cart]);

  const addCart = useCallback((id) => dispatch({ type: "add", id }), []);
  const increaseQty = useCallback((id) => dispatch({ type: "increase", id }), []);
  const decreaseQty = useCallback((id) => dispatch({ type: "decrease", id }), []);
  const removeItem = useCallback((id) => dispatch({ type: "remove", id }), []);

  const value = useMemo(
    () => ({
      ...summarizeCart(cart),
      addCart,
      increaseQty,
      decreaseQty,
      removeItem,
    }),
    [cart, addCart, increaseQty, decreaseQty, removeItem]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside <ShopContextProvider>");
  return context;
}
