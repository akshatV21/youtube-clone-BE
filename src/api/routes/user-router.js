const { Router } = require("express")
const { httpUpdateWatchLater } = require("../controllers/user-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")
const { validateVideoRequest } = require("../middlewares/video-middlewares")

const userRouter = Router()

userRouter.patch("/watchLater", authorizeUser, validateVideoRequest, httpUpdateWatchLater)

module.exports = userRouter
