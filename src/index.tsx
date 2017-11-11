import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";

import ConnectedMain from "./components/Main";

import createStore from "./create-store";

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedMain />
    </Provider>,
    document.getElementById("example")
);