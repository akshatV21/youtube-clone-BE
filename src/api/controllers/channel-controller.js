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

const httpGetChannel = async (req, res, next) => {
  try {
    const user = req.user
    const channel = await ChannelModel.findById(user.channel).populate("videos")

    res.status(200).json({ success: true, message: CONTENTS.GET_CHANNEL, channel: channel })
  } catch (error) {
    next(error)
  }
}

const httpSubscribeChannel = async (req, res, next) => {
  try {
    const channel = req.channel
    const user = req.user

    channel.subscribers.push(user._id)
    user.subscribed.push(channel._id)

    await Promise.all([channel.save(), user.save()])
    res.status(200).json({ success: true, message: CONTENTS.SUBSCRIBED_CHANNEL })
  } catch (error) {
    next(error)
  }
}

module.exports = { httpCreateChannel, httpGetChannel, httpSubscribeChannel }