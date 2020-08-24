import { Dialog, Button, Classes } from "@blueprintjs/core";
import React, { useState } from "react";
function App(props) {
    return (
        <React.Fragment>
            <div class="bp3-dialog-container">
                <div class="bp3-dialog">
                    <div class="bp3-dialog-header">
                        <span class="bp3-icon-large bp3-icon-inbox"></span>
                        <h4 class="bp3-heading">Dialog header</h4>
                        <button
                            aria-label="Close"
                            class="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross"
                        ></button>
                    </div>
                    <div class="bp3-dialog-body">
                        This dialog hasn't been wired up with any open or close interactions. It's
                        just an example of markup and styles.
                    </div>
                    <div class="bp3-dialog-footer">
                        <div class="bp3-dialog-footer-actions">
                            <button type="button" class="bp3-button">
                                Secondary button
                            </button>
                            <button type="submit" class="bp3-button bp3-intent-primary">
                                Primary button
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default App;
