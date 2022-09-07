const PlaylistModel = require("../models/playlist-model")

const httpUpdateWatchLater = async (req, res, next) => {
  try {
    const user = req.user
    const videoId = req.video._id

    if (user.watchLater.includes(videoId)) {
      const videoIdIndex = user.watchLater.findIndex(id => id === videoId)
      user.watchLater.splice(videoIdIndex, 1)
    } else {
      user.watchLater.push(videoId)
    }

    await user.save()
  } catch (error) {
    next(error)
  }
}

const httpCreateUserPlaylist = async (req, res, next) => {
  try {
    const user = req.user
    const playlist = { ...req.playlist, ownerId: user._id }

    const newPlaylist = new PlaylistModel(playlist)
    user.playlist.push(newPlaylist._id)

    await Promise.all([user.save(), newPlaylist.save()])
    res.status(200).json({ success: true, message: "Playlist saved successfully!", playlist: newPlaylist })
  } catch (error) {
    next(error)
  }
}

module.exports = { httpUpdateWatchLater, httpCreateUserPlaylist }
