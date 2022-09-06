const CONTENTS = require("../../contents/contents")
const NodeError = require("../../error/error-object")
const ChannelModel = require("../models/channel-model")

const httpCreateChannel = async (req, res, next) => {
  try {
    const name = req.body.name
    if (!name) throw new NodeError(400, "Please provide a name!")

    const channel = new ChannelModel({ name, userId: req.user._id })
    req.user.channel = channel._id
    await Promise.all([channel.save(), req.user.save()])

    res.status(201).json({ success: true, message: CONTENTS.CHANNEL_CREATED, channel: channel })
  } catch (error) {
    next(error)
  }
}

module.exports = { httpCreateChannel }
