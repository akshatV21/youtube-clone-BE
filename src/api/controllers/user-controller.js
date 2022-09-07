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

module.exports = { httpUpdateWatchLater }
