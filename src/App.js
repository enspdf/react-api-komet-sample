import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Product from "./components/Product";
import About from "./components/About";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <div>
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
        </div>
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
      </Router>
    </div>
  );
}

export default App;
