const CONTENTS = require("../../contents/contents")
const NodeError = require("../../error/error-object")
const ChannelModel = require("../models/channel-model")
const PlaylistModel = require("../models/playlist-model")

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

const httpUnsubscribeChannel = async (req, res, next) => {
  try {
    const channel = req.channel
    const user = req.user

    const channelIdIndex = user.subscribed.findIndex(chnl => chnl._id === channel._id)
    const userIdIndex = channel.subscribers.findIndex(subscriber => subscriber._id === user._id)

    channel.subscribers.splice(userIdIndex, 1)
    user.subscribed.splice(channelIdIndex, 1)

    await Promise.all([channel.save(), user.save()])
    res.status(200).json({ success: true, message: CONTENTS.SUBSCRIBED_CHANNEL })
  } catch (error) {
    next(error)
  }
}

const httpGetChannelVideos = async (req, res, next) => {
  try {
    const user = req.user
    const channel = req.channel
    let videos

    if (user.channel === channel._id) {
      videos = (await channel.populate({ path: "videos" })).videos
    } else {
      videos = (await channel.populate({ path: "videos", match: { private: false } })).videos
    }

    res.status(200).json({ success: true, message: CONTENTS.GET_CHANNEL_VIDEOS, videos })
  } catch (error) {
    next(error)
  }
}

const httpCreateChannelPlaylist = async (req, res, next) => {
  const channel = req.channel
  const playlist = { ...req.playlist, ownerId: channel._id }

  const newPlaylist = new PlaylistModel(playlist)
  channel.playlists.push(newPlaylist._id)

  await Promise.all([channel.save(), newPlaylist.save()])
  res.status(201).json({ success: true, message: "Playlist saved successfully!", playlist: newPlaylist })
}

module.exports = {
  httpCreateChannel,
  httpGetChannel,
  httpSubscribeChannel,
  httpUnsubscribeChannel,
  httpGetChannelVideos,
  httpCreateChannelPlaylist,
}
