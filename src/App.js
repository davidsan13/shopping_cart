import Navbar from './components/Navbar'
import { BrowserRouter } from "react-router-dom"
import RouteSwitch from './components/RouteSwitch'
import ShoppingCart from './components/ShoppingCart'
import './assets/style.css'
function App() {
  return (
   
      <BrowserRouter>
        <div className="App">
          {/* <Navbar/> */}
          <RouteSwitch/>

        </div>
      </BrowserRouter>
  );
}

export default App;
