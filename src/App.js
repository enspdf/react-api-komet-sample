import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Product from "./components/Product";
import About from "./components/About";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <header>
          <nav>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </nav>
        </header>
        <body>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/product">
              <Product />
            </Route>
          </Switch>
        </body>
      </Router>
    </div>
  );
}

export default App;
