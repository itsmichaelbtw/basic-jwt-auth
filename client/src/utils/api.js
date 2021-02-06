const axios = require("axios").default

const Login = async function(credentials){
    try {
        const { data: LoginSession } = await axios.post("/api/user/login", credentials)

        return LoginSession
    } catch (error) {
        throw {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

const Register = async function(credentials){
    try {
        const { data: RegisterSession } = await axios.post("/api/user/register", credentials)

        return RegisterSession
    } catch (error) {
        throw {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

const Validate = async function(token){
    try {
        await axios.get("/api/user/validate", { headers: { "Authorization": "Bearer " + token } })

        return true
    } catch (error) {
        return false
    }
}

const FetchUser = async function(token){
    try {
        const { data: User } = await axios.get("/api/user/fetch", { headers: { "Authorization": "Bearer " + token } })

        return User
    } catch (error) {
        throw {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

export default {
    Login, Register, Validate, FetchUser
}
