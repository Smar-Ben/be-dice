import Roll from "./Roll/Roll";
import Home from "./Home/Home";
import Header from "./Header/Header";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <Header>
                <Switch>
                    <Route exact={true} path="/" component={Home}></Route>
                    <Route path="/roll" component={Roll}></Route>
                </Switch>
            </Header>
        </Router>
    );
}
export default App;
