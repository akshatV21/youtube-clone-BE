const { Router } = require("express")
const { httpPostNewVideo, httpGetReletedVideos, httpGetVideoById } = require("../controllers/video-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")
const { validateVideoPostRequest, vlidateRelatedVideosRequest } = require("../middlewares/video-middlewares")

const videoRouter = Router()

videoRouter.post("/post", authorizeUser, validateVideoPostRequest, httpPostNewVideo)

videoRouter.get("/:videoId", authorizeUser, httpGetVideoById)
videoRouter.get("/releted", authorizeUser, vlidateRelatedVideosRequest, httpGetReletedVideos)

module.exports = videoRouter
