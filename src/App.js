import Navbar from './components/Navbar'
import { BrowserRouter } from "react-router-dom"
import RouteSwitch from './components/RouteSwitch'
function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <RouteSwitch/>
        </div>
      </BrowserRouter>
  );
}

export default App;
