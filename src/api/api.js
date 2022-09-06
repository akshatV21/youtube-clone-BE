const { Router } = require("express")
const authRouter = require("./routes/auth-router")
const videoRouter = require("./routes/video-router")
const channelRouter = require("./routes/channel-router")

const api = Router()

api.use("/auth", authRouter)
api.use("/videos", videoRouter)
api.use("/channel", channelRouter)

module.exports = api
