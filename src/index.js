import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css'; 
import App from "./App";
// import Router from "./router";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch,Routes } from "react-router-dom";
 
ReactDOM.render(
<React.StrictMode>
  <Router>
  <App/>
  </Router>
    </React.StrictMode> 
  ,
  document.getElementById("root")
);

serviceWorker.unregister();
