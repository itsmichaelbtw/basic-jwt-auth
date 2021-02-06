import React, { createContext, useReducer, useContext } from "react"

export const ApplicationContext = createContext()

export const ApplicationProvider = (props) => {
    return (
        <ApplicationContext.Provider value={useReducer(props.reducer, props.initialState)}>
            {props.children}
        </ApplicationContext.Provider>
    )
}

export const ApplicationUseContext = () => useContext(ApplicationContext)
