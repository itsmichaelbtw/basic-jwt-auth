export const InitialState = {
    contextFocused: undefined,
    context: undefined,
    isLoading: true,
    session: {
        user: undefined,
        token: undefined
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
                contextFocused: undefined,
                context: undefined,
                isLoading: true,
                session: {
                    user: undefined,
                    token: undefined
                }
            }
        }

        case "SET_CONTEXT": {
            return {
                ...state,
                context: action.payload.context,
                contextFocused: action.payload.contextFocused
            }
        }

        case "FOCUSED_CONTEXT": {
            return {
                ...state,
                contextFocused: action.payload.contextFocused,
                isLoading: true
            }
        }

        case "SET_LOADING": {
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
