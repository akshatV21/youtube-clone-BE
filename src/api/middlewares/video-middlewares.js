const CONTENTS = require("../../contents/contents")
const NodeError = require("../../error/error-object")

const validateVideoPostRequest = async (req, res, next) => {
  try {
    const { title, description, link, thumbnail, category } = req.body
    if (!title) throw new NodeError(400, CONTENTS.NULL_TITLE)
    if (!description) throw new NodeError(400, CONTENTS.NULL_DESCRIPTION)
    if (!link) throw new NodeError(400, CONTENTS.NULL_LINK)
    if (!thumbnail) throw new NodeError(400, CONTENTS.NULL_THUMBNAIL)
    if (!category) throw new NodeError(400, CONTENTS.NULL_CATEGORY)

    req.video = { title, description, thumbnail, category, link }
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

module.exports = { validateVideoPostRequest, vlidateRelatedVideosRequest }
