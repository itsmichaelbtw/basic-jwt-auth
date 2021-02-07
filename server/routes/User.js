const router = require("express").Router()
const Auth = require("../middleware/Auth")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
        // check if req.body is an object

        if (typeof req.body !== "object") {

            // throwing an error will be caught by the catch
            // and will send the error back to the client
            throw "Invalid body request"
        }

        const { username, email, password, confirm } = req.body

        const isEmailUnique = await User.findOne({email: email}) ? false : true

        if (!isEmailUnique) {
            throw "Email already taken"
        }

        const toCheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

        if (!toCheck.test(email)) {
            throw "Invalid email address"
        }

        if (password !== confirm) {
            throw "Passwords do not match"
        }

        const Salt = await bcrypt.genSalt(4)
        const Hash = await bcrypt.hash(password, Salt)

        if (!Hash) {
            throw "Unable to create account"
        }

        const NewUser = await new User({
            id: uuid.v4(),
            username: username,
            email: email,
            password: Hash,
            created: Date.now()
        }).save()

        res.status(200).json({
            token: jwt.sign(NewUser.id, process.env.SECRET)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        // check if req.body is an object

        if (typeof req.body !== "object") {

            // throwing an error will be caught by the catch
            // and will send the error back to the client
            throw "Invalid body request"
        }

        const { email, password } = req.body

        // make this a global function
        // utils/common.js

        const toCheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

        if (!toCheck.test(email)) {
            throw "Invalid email address"
        }

        const UserAccount = await User.findOne({ email: email })

        if (!UserAccount) {
            throw "No account on record"
        }

        const isPasswordMatch = await bcrypt.compare(password, UserAccount.password)

        if (!isPasswordMatch) {
            throw "Password is incorrect"
        }

        res.status(200).json({
            token: jwt.sign(UserAccount.id, process.env.SECRET)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
})

router.get("/validate", Auth.ValidateSession, (req, res) => {
    res.status(200).json({
        valid: true
    })
})

module.exports = router
