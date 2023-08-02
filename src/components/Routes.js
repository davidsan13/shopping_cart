import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Main from "./Main";
import ErrorPage from "../pages/Error";
import ShoppingCart from "../pages/ShoppingCart";
const router = createBrowserRouter([ 
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main/>
      },
      {
        path: 'products',
        element: <Products />,
        children: [
          {
            path:":categoryId",
            element: <Products />
          }
        ]
      },
      {
        path: 'Cart',
        element: <ShoppingCart/>
      }
      
    ]
  }
])

export default router