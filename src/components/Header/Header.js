import "./Header.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function App(props) {
    return (
        <div className="App">
            <div className="header">
                <div></div>
                <h1>BE DICE</h1>
                <div>
                    <FontAwesomeIcon icon={faHome} className="mainIcon" size="2x" />
                </div>
            </div>
            <div className="main">{props.children}</div>
        </div>
    );
}
export default App;
