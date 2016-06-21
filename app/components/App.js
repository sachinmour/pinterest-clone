import React from "react";
import ReactDOM from "react-dom";
import { browserHistory, Router } from "react-router";
import routes from '../client_routes/routes';
require("../../public/style.scss");

ReactDOM.render(
    <Router history={browserHistory}>{routes}</Router>, document.getElementById('app')
);
