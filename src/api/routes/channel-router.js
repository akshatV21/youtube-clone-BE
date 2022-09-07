const { Router } = require("express")
const { httpGetChannel, httpCreateChannel, httpSubscribeChannel, httpUnsubscribeChannel, httpCreateChannelPlaylist } = require("../controllers/channel-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")
const { validateChannelRequest } = require("../middlewares/channel-middlewares")
const { validatePlaylistRequest } = require("../middlewares/playlist-middlewares")

const channelRouter = Router()

channelRouter.post("/create", authorizeUser, httpCreateChannel)
channelRouter.post("/playlist", authorizeUser, validateChannelRequest, validatePlaylistRequest, httpCreateChannelPlaylist)

channelRouter.get("/", authorizeUser, validateChannelRequest, httpGetChannel)
channelRouter.get("/videos", authorizeUser)

channelRouter.patch("/subscribe", authorizeUser, validateChannelRequest, httpSubscribeChannel)
channelRouter.patch("/unsubscribe", authorizeUser, validateChannelRequest, httpUnsubscribeChannel)

module.exports = channelRouter
