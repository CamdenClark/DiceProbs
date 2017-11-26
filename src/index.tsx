import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { About } from "./components/About/index";
import ConnectedMain from "./components/Main/index";

import { BrowserRouter, Link, Route } from "react-router-dom";

import createStore from "./create-store";

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="container">
            <div className="nav nav-pills" style={{paddingBottom: 8}}>
                <Link to="/" className="navbar-brand" href="/">DiceProbs
                    <span className="sr-only">(current)</span></Link>
                <Link className="nav-item nav-link" to="/about">About</Link>
            </div>
            <Route exact path="/" component={ConnectedMain} />
            <Route path="/about" component={About} />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById("example")
);