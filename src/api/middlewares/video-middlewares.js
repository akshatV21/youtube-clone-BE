const CONTENTS = require("../../contents/contents")
const NodeError = require("../../error/error-object")
const VideoModel = require("../models/video-model")

const validateVideoPostRequest = async (req, res, next) => {
  try {
    const user = req.user

    if (!user.channel) throw new NodeError(403, "You must have a channel!")

    const { title, description, link, thumbnail, category } = req.body
    if (!title) throw new NodeError(400, CONTENTS.NULL_TITLE)
    if (!description) throw new NodeError(400, CONTENTS.NULL_DESCRIPTION)
    if (!link) throw new NodeError(400, CONTENTS.NULL_LINK)
    if (!thumbnail) throw new NodeError(400, CONTENTS.NULL_THUMBNAIL)
    if (!category) throw new NodeError(400, CONTENTS.NULL_CATEGORY)

    req.video = { channelId: user.channel._id, title, description, thumbnail, category, link }
    next()
  } catch (error) {
    next(error)
  }
}

const vlidateRelatedVideosRequest = (req, res, next) => {
  const { category } = req.query

  if (!category) {
    req.category = req.user.interests
    next()
    return
  }

  req.category = category.split("%")
  next()
}

const validateVideoLikeRequest = async (req, res, next) => {
  try {
    const videoId = req.query.videoId
    if (!videoId) throw new NodeError(400, "Please provide video id!")

    const video = await VideoModel.findById(videoId)
    if (!video) throw new NodeError(404, "Cannot find video!")

    req.video = video
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { validateVideoPostRequest, vlidateRelatedVideosRequest, validateVideoLikeRequest }
