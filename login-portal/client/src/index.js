import React from "react";
import ReactDOM from "react-dom";
import classes from "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App className={classes.all} />
  </BrowserRouter>
);
