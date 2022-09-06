const { Router } = require("express")
const { authorizeUser } = require("../middlewares/auth-middlewares")

const channelRouter = Router()

channelRouter.post("/create", authorizeUser, httpCreateChannel)

module.exports = channelRouter
