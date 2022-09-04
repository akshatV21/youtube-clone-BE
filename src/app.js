const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { default: helmet } = require("helmet")
const api = require("./api/api")
const handleError = require("./error-handlers/errorHandler")

const app = express()

// middlwares
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())
app.use(express.json())

// router
app.use("/api", api)
app.use(handleError)

module.exports = app
