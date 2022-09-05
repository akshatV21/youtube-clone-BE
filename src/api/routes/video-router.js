const { Router } = require("express")
const { httpPostNewVideo } = require("../controllers/video-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")
const { validateVideoPostRequest } = require("../middlewares/video-middlewares")

const videoRouter = Router()

videoRouter.post("/post", authorizeUser, validateVideoPostRequest, httpPostNewVideo)

videoRouter.get("/:videoId", authorizeUser, httpGetVideoById)

module.exports = videoRouter
