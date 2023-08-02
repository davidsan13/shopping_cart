
import { RouterProvider } from "react-router-dom"
import router from "./components/Routes";
import './assets/style.css'
import { ShopContextProvider } from "./components/ShopContextProvider";
function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <RouterProvider router={router} />
      </ShopContextProvider>
    </div>
  );
}

export default App;
