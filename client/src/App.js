import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoute from "./pages/ProtectedRoute"

import Menu from "antd/lib/menu"
import Alert from "antd/lib/alert"

import { ApplicationUseContext, ApplicationProvider } from "./context/state"
import Api from './utils/api'

// this is where the state is checked to see if the user is authenticated
// if they are => renders dashboard
// if they are not => redirects to login

const ProtectedRoute = (props) => {
    const [state, dispatch] = ApplicationUseContext()

    return (
        <Route {...props.rest} render={({location}) => (
            state.session.token ? (
                props.children
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: location }}} />
            )
        )} />
    )
}

export default function App() {
    const [isLoading, setLoading] = useState(true)
    const [state, dispatch] = ApplicationUseContext()

    // initial load of the website checks if a token persists in localstorage and verifies with server
    // this only loads once per page refresh

    useEffect(() => {
        (async function(){
            try {
                const Token = localStorage.getItem("session")

                if (Token) {
                    await Api.Validate(Token)

                    dispatch({
                        type: "SET_USER",
                        payload: {
                            token: Token
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            } 
        })()
    }, [])

    return (
        <Router>
            <div className="app-container">
                <Alert message={`${state.session?.token ? "You are logged in" : "You are logged out"}`} type={`${state.session?.token ? "success" : "error"}`} banner/>

                <div className="navbar">
                    <Menu theme="light" mode="horizontal" className="navbar-menu" selectable={false}>
                        <Menu.Item key="/"><NavLink to="/" activeStyle={{ color: "#1890FF"}} exact>Home</NavLink></Menu.Item>
                        <Menu.Item key="/login"><NavLink to="/login" activeStyle={{ color: "#1890FF" }} exact>Login</NavLink></Menu.Item>
                        <Menu.Item key="/register"><NavLink to="/register" activeStyle={{ color: "#1890FF" }} exact>Register</NavLink></Menu.Item>
                        <Menu.Item key="/dashboard"><NavLink to="/dashboard" activeStyle={{ color: "#1890FF" }} exact>Dashboard</NavLink></Menu.Item>
                    </Menu>
                </div>

                <div className="wrap">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>

                        <Route path="/login">
                            <Login />
                        </Route>

                        <Route path="/register">
                            <Register />
                        </Route>

                        <ProtectedRoute path="/dashboard">
                            <PrivateRoute />
                        </ProtectedRoute>
                    </Switch>
                </div>
            </div>
        </Router>

        
    )
}
