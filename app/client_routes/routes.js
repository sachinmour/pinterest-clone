import Main from "../components/Main";
import AllPins from "../components/AllPins";
import MyPins from "../components/MyPins";
import AddPin from "../components/AddPin";
import React from "react";
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path='/' component={Main}>
    	<IndexRoute component={AllPins} />
    	<Route path="my" component={MyPins} />
	  	<Route path="add" component={AddPin} />
  	</Route>
);
