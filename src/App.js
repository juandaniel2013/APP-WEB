import React, {Component} from 'react';
import './App.css';
import {ITEMS} from "./shared/items";
import Main from "./components/MainComponent";
import {BrowserRouter} from "react-router-dom";

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            items: ITEMS
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Main/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
