import { createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ShoppingCart from "./pages/ShoppingCart";
import ErrorPage, { NotFound } from "./pages/Error";

// Errors render inside <Layout> (the pathless child), so the nav stays usable.
export const routes = [
  {
    element: <Layout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/products", element: <Products /> },
          { path: "/products/:platformId", element: <Products /> },
          { path: "/cart", element: <ShoppingCart /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
];

// GitHub Pages can't rewrite deep links to index.html, so a hash router
// (/#/products) is what keeps refresh and shared links working there.
const router = createHashRouter(routes);

export default router;
