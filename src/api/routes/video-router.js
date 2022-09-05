const { Router } = require("express")
const { httpPostNewVideo } = require("../controllers/video-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")
const { validateVideoPostRequest } = require("../middlewares/video-middlewares")

const videoRouter = Router()

videoRouter.post("/post", authorizeUser, validateVideoPostRequest, httpPostNewVideo)

module.exports = videoRouter
