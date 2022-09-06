const { Router } = require("express")
const { httpGetChannel, httpCreateChannel, httpSubscribeChannel } = require("../controllers/channel-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")
const { validateSubscribeRequest } = require("../middlewares/channel-middlewares")

const channelRouter = Router()

channelRouter.post("/create", authorizeUser, httpCreateChannel)

channelRouter.get("/", authorizeUser, httpGetChannel)

channelRouter.patch("/subscribe", authorizeUser, validateSubscribeRequest, httpSubscribeChannel)

module.exports = channelRouter
