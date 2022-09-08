const { Router } = require("express")
const {
  httpPostNewVideo,
  httpGetReletedVideos,
  httpGetVideoById,
  httpLikeVideo,
  httpDisLikesVideo,
  httpGetRecommendedVideos,
} = require("../controllers/video-controller")
const { authorizeUser } = require("../middlewares/auth-middlewares")
const { validateVideoPostRequest, vlidateRelatedVideosRequest, validateVideoRequest } = require("../middlewares/video-middlewares")

const videoRouter = Router()

videoRouter.post("/post", authorizeUser, validateVideoPostRequest, httpPostNewVideo)

videoRouter.get("/releted", authorizeUser, vlidateRelatedVideosRequest, httpGetReletedVideos)
videoRouter.get("/recommended", authorizeUser, httpGetRecommendedVideos)
videoRouter.get("/:videoId", authorizeUser, httpGetVideoById)

videoRouter.patch("/like", authorizeUser, validateVideoRequest, httpLikeVideo)
videoRouter.patch("/disLike", authorizeUser, validateVideoRequest, httpDisLikesVideo)

module.exports = videoRouter
