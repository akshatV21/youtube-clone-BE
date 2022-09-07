const { Router } = require("express")
const { httpGetChannel, httpCreateChannel, httpSubscribeChannel, httpUnsubscribeChannel } = require("../controllers/channel-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")
const { validateChannelRequest } = require("../middlewares/channel-middlewares")

const channelRouter = Router()

channelRouter.post("/create", authorizeUser, httpCreateChannel)
channelRouter.post("/playlist", authorizeUser, validateChannelRequest)

channelRouter.get("/", authorizeUser, validateChannelRequest, httpGetChannel)
channelRouter.get("/videos", authorizeUser)

channelRouter.patch("/subscribe", authorizeUser, validateChannelRequest, httpSubscribeChannel)
channelRouter.patch("/unsubscribe", authorizeUser, validateChannelRequest, httpUnsubscribeChannel)

module.exports = channelRouter
