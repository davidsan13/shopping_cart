
import { HashRouter } from "react-router-dom"
import RouteSwitch from './components/RouteSwitch'
import './assets/style.css'

function App() {
  return (
   
      <HashRouter>
        <div className="App">
          <RouteSwitch/>
        </div>
      </HashRouter>
  );
}

export default App;
