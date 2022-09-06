const NodeError = require("../../error/error-object")
const ChannelModel = require("../models/channel-model")

const validateSubscribeRequest = async (req, res, next) => {
  try {
    const channelId = req.query.channelId
    if (!channelId) throw new NodeError(400, "Please provide channel id!")

    const channel = await ChannelModel.findById(channelId)
    if (!channel) throw new NodeError(404, "Channel not found!")

    req.channel = channel
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { validateSubscribeRequest }
