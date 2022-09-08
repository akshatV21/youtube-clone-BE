const { Router } = require("express")
const { httpUpdateWatchLater, httpCreateUserPlaylist, httpGetUser } = require("../controllers/user-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")
const { validatePlaylistRequest } = require("../middlewares/playlist-middlewares")
const { validateVideoRequest } = require("../middlewares/video-middlewares")

const userRouter = Router()

userRouter.post("/playlist", authorizeUser, validatePlaylistRequest, httpCreateUserPlaylist)

userRouter.get("/", authorizeUser, httpGetUser)

userRouter.patch("/watchLater", authorizeUser, validateVideoRequest, httpUpdateWatchLater)

module.exports = userRouter
