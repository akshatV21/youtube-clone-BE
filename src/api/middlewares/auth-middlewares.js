const CONTENTS = require("../../contents/contents")
const UserModel = require("../models/user-model")
const NodeError = require("../../error/errorHandler")
const getUserIdFromToken = require("../../helpers/verifyToken")

const validateRegisterRequest = async (req, res, next) => {
  const { username, email, password } = req.body
  if (!username) return res.status(400).json({ success: false, message: CONTENTS.NULL_USERNAME })
  if (!email) return res.status(400).json({ success: false, message: CONTENTS.NULL_EMAIL })
  if (!password) return res.status(400).json({ success: false, message: CONTENTS.NULL_PASSWORD })

  req.user = { username, email, password }
  next()
}

const validateLoginRequest = async (req, res, next) => {
  const { input, password } = req.body
  if (!input) return res.status(400).json({ success: false, message: CONTENTS.NULL_INPUT })
  if (!password) return res.status(400).json({ success: false, message: CONTENTS.NULL_PASSWORD })

  req.user = { input, password }
  next()
}

const authorizeUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    if (!authHeader) throw new NodeError(401, "User not logged in!")

    const token = authHeader.split(" ")[1]
    const userId = getUserIdFromToken(token)

    const user = await UserModel.findById(userId)
    if (!user) throw new NodeError(404, "User not found!")

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { validateRegisterRequest, validateLoginRequest }
