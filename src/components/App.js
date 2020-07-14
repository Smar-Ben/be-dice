import Roll from "./Roll/Roll";
import Header from "./Header/Header";
import React from "react";

function App() {
    return (
        <React.Fragment>
            <Header>
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
                    <button style={{ margin: 10 }}>Create</button>
                    <button style={{ margin: 10 }}>Join</button>
                </div> */}
                <Roll />
            </Header>
        </React.Fragment>
    );
}
export default App;
