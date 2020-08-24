import Roll from "./Roll/Roll";
import Home from "./Home/Home";
import Header from "./Header/Header";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Button } from "@blueprintjs/core";
import Dialog from "./NewDialog";
function App() {
    const [isOpen, setOpen] = useState(false);
    return (
        <React.Fragment>
            <Router>
                <Header>
                    <Switch>
                        <Route exact={true} path="/" component={Home}></Route>
                        <Route path="/roll" component={Roll}></Route>
                    </Switch>
                </Header>
            </Router>
        </React.Fragment>
    );
}
export default App;
