const CONTENTS = require("../../contents/contents")
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

module.exports = { httpPostNewVideo }
