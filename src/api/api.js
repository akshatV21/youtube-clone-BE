const { Router } = require("express")
const authRouter = require("./routes/auth-router")
const videoRouter = require("./routes/video-router")

const api = Router()

api.use("/auth", authRouter)
api.use("/videos", videoRouter)

module.exports = api
