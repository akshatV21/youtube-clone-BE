const { Router } = require("express")
const authRouter = require("./routes/auth-router")

const api = Router()

api.use("/auth", authRouter)

module.exports = api
