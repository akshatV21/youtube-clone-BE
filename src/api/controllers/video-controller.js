const CONTENTS = require("../../contents/contents")
const NodeError = require("../../error/error-object")
const VideoModel = require("../models/video-model")
const ChannelModel = require("../models/channel-model")

const httpPostNewVideo = async (req, res, next) => {
  try {
    const video = new VideoModel(req.video)
    const channel = await ChannelModel.findById(req.user.channel)

    channel.videos.push(video._id)
    await Promise.all([channel.save(), video.save()])

    res.status(201).json({ success: true, message: CONTENTS.VIDEO_POSTED, video: video })
  } catch (error) {
    next(error)
  }
}

const httpGetVideoById = async (req, res, next) => {
  try {
    const video = await VideoModel.findById(req.params.videoId, { private: false })
    if (!video) throw new NodeError(404, "Video not found!")

    res.status(200).json({ success: true, message: CONTENTS.GET_VIDEO, video: video })
  } catch (error) {
    next(error)
  }
}

const httpGetReletedVideos = async (req, res, next) => {
  try {
    const category = req.category
    const videos = (await VideoModel.find({ category: { $in: category } })).reverse()

    res.status(200).json({ success: true, message: CONTENTS.GET_VIDEO, videos: videos })
  } catch (error) {
    next(error)
  }
}

const httpLikeVideo = async (req, res, next) => {
  try {
    const user = req.user
    const video = req.video

    if (user.likedVideos.includes(video._id)) {
      const videoIdIndex = user.likedVideos.findIndex(id => id === video._id)
      user.likedVideos.splice(videoIdIndex, 1)
      video.likes - +1
    } else {
      user.likedVideos.push(video._id)
      video.likes += 1
    }

    await Promise.all([user.save(), video.save()])
    res.status(200).json({ success: true, message: CONTENTS.LIKED_VIDEO, videoLikes: video.likes })
  } catch (error) {
    next(error)
  }
}

const httpDisLikesVideo = async (req, res, next) => {
  try {
    const user = req.user
    const video = req.video

    if (user.dislikedVideos.includes(video._id)) {
      const videoIdIndex = user.dislikedVideos.findIndex(id => id === video._id)
      user.dislikedVideos.splice(videoIdIndex, 1)
      video.dislikes - +1
    } else {
      user.dislikedVideos.push(video._id)
      video.dislikes -= 1
    }

    await Promise.all([user.save(), video.save()])
    res.status(200).json({ success: true, message: CONTENTS.DISLIKED_VIDEO, videoDisLikes: video.dislikes })
  } catch (error) {
    next(error)
  }
}

const httpGetRecommendedVideos = async (req, res, next) => {
  try {
    const videos = await VideoModel.find().sort({ _id: -1 }).limit(50)
    res.status(200).json({ success: true, message: "Videos fetched successfully!", videos: videos })
  } catch (error) {
    next(error)
  }
}

module.exports = { httpPostNewVideo, httpGetVideoById, httpGetReletedVideos, httpLikeVideo, httpDisLikesVideo }
