const validatePlaylistRequest = async (req, res, next) => {
  try {
    const { name, description } = req.body

    if (!name) throw new NodeError(400, "Please provide a name!")
    if (!description) throw new NodeError(400, "Please provide a description!")

    req.playlist = { name, description }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { validatePlaylistRequest }
