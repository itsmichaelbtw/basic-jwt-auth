require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const port = process.env.PORT

const app = express()

// tell express its behind a proxy
app.enable("trust proxy")

// disable express header
app.disable("x-powered-by")

// pass body request as json
app.use(express.json())

// cors
app.use(cors())

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, err => {
    console.log(err ? err : "Mongoose has connected")
})

app.get("/", (req, res) => {
    res.send("Homepage")
})

// use the User.js file for all routes on /api/user
app.use("/api/user", require("./routes/User.js"))

app.listen(port, () => {
    console.log("Server is running")
})
