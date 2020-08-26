import Roll from "./Roll/Roll";
import Home from "./Home/Home";
import Header from "./Header/Header";
import React from "react";
import Erreur from "./Erreur";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Header>
                    <Switch>
                        <Route exact={true} path="/" component={Home}></Route>
                        <Route path="/roll" component={Roll}></Route>
                        <Route path="/" component={Erreur}></Route>
                    </Switch>
                </Header>
            </Router>
        </React.Fragment>
    );
}
export default App;
