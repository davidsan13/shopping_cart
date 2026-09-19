import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./assets/style.scss";
import { ShopContextProvider } from "./components/ShopContextProvider";

function App() {
  return (
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  );
}

export default App;
