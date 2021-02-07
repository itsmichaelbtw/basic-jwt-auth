export const InitialState = {
    session: {
        token: "s"
    }
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER": {
            return {
                ...state,
                session: action.payload
            }
        }

        case "REMOVE_USER": {
            return {
                session: {
                    token: undefined
                }
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
