import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoute from "./pages/ProtectedRoute"

import Menu from "antd/lib/menu"

import { ApplicationUseContext, ApplicationProvider } from "./context/state"

export default function App() {

    const [state, dispatch] = ApplicationUseContext()

    return (
        <Router>
            <div className="app-container">
                <ApplicationProvider>
                    <div className="navbar">
                        <Menu theme="light" mode="horizontal" className="navbar-menu">
                            <Menu.Item key="/">Home</Menu.Item>
                            <Menu.Item key="/login">Login</Menu.Item>
                            <Menu.Item key="/register">Register</Menu.Item>
                            <Menu.Item key="/protected-route-one">Protected Route 1</Menu.Item>
                            <Menu.Item key="/protected-route-two">Protected Route 2</Menu.Item>
                        </Menu>
                    </div>

                    <div className="wrap">
                        <Switch>
                            <Route to="/">
                                <Home />
                            </Route>

                            <Route to="/login">
                                <Login />
                            </Route>

                            <Route to="/register">
                                <Register />
                            </Route>

                            <Route to="/protected-route-one">
                                <PrivateRoute />
                            </Route>

                            <Route to="/protected-route-two">
                                <PrivateRoute />
                            </Route>
                        </Switch>
                    </div>
                </ApplicationProvider>
            </div>
        </Router>

        
    )
}
