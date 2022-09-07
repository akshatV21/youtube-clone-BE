const validatePlaylistRequest = async (req, res, next) => {
  try {
    const { name, description, private } = req.body

    if (!name) throw new NodeError(400, "Please provide a name!")
    if (!description) throw new NodeError(400, "Please provide a description!")
    if (!private) throw new NodeError(400, "Please provide a private value!")

    req.playlist = { name, description, private }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { validatePlaylistRequest }
