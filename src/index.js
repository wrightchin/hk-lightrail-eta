import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WRL from './Mtr';
import LRT from './Lrt';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/lrt">
          <LRT/>
        </Route>
        <Route path="/mtr">
          <WRL/>
        </Route>
        <Route path="/">
          <LRT/>
        </Route>
        {/* <Main/> */}
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


