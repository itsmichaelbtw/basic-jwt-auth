const User = require("../models/User")
const jwt = require("jsonwebtoken")

const ValidateSession = (req, res, next) => {
    try {
        // splits Bearer [token]

        const Token = req.header("Authorization") ? req.header("Authorization").split(" ")[1] : null

        if (!Token) {
            throw "Unauthorized"
        }

        const ValidateToken = jwt.verify(Token, process.env.SECRET)

        if (!ValidateToken) {
            throw "Unauthorized"
        }

        // adds the user id to req.user

        req.user = ValidateToken
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            error: error
        })
    }
} 

module.exports = {
    ValidateSession
}
