const { Router } = require("express")
const { httpGetChannel, httpCreateChannel } = require("../controllers/channel-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")

const channelRouter = Router()

channelRouter.post("/create", authorizeUser, httpCreateChannel)

channelRouter.get("/", authorizeUser, httpGetChannel)

module.exports = channelRouter
