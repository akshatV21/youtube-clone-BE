const CONTENTS = require("../../contents/contents")
const NodeError = require("../../error/error-object")
const VideoModel = require("../models/video-model")

const httpPostNewVideo = async (req, res, next) => {
  try {
    const video = new VideoModel(req.video)
    await video.save()

    res.status(201).json({ success: true, message: CONTENTS.VIDEO_POSTED })
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
  const category = req.category
  const videos = (await VideoModel.find({ category: { $in: category } })).reverse()
}

module.exports = { httpPostNewVideo, httpGetVideoById }
