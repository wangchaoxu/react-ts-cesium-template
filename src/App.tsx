import React from "react";
import "./App.css";
import "cesium/Widgets/widgets.css";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Index from "./views/Index";
import Login from "./views/Login";
import NotFound from "./components/pages/NotFound";
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/404">404</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/index" push />} />
          <Route path="/index" component={Index} />
          <Route path="/404" component={NotFound} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
