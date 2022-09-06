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
  const video = req.video

  video.likes += 1
  await video.save()

  res.status(200).json({ success: true, message: CONTENTS.LIKED_VIDEO, videoLikes: video.likes })
}

module.exports = { httpPostNewVideo, httpGetVideoById, httpGetReletedVideos, httpLikeVideo }
