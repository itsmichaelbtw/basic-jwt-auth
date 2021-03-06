import React from "react"
import ReactDOM from "react-dom"
import App from "./src/app"

import "antd/dist/antd.css"
import "./src/styles/main.css"

import { ApplicationProvider } from "./src/context/state"
import { InitialState, Reducer } from "./src/context/reducer"

// pass through the initial state and reducer so the provider has access to it
// could also just import directly on the state.js file

const Application = () => {
    return (
        <ApplicationProvider reducer={Reducer} initialState={InitialState}>
            <App />
        </ApplicationProvider>
    )
}

ReactDOM.render(<Application />, document.getElementById("root"))
