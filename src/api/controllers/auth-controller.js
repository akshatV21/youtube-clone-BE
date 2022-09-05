const CONTENTS = require("../../contents/contents")
const UserModel = require("../models/user-model")
const NodeError = require("../../error/error-object")

const httpRegisterUser = async (req, res, next) => {
  try {
    const user = new UserModel(req.user)
    await user.save()

    const { password, ...rest } = user._doc
    res.status(201).json({ success: true, message: CONTENTS.REGISTERED_USER, user: rest })
  } catch (error) {
    next(error)
  }
}

const httpLoginUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByInput(req.user.input)

    if (!user) throw new NodeError(404, "User not found!")
    if (!user.passwordMatches) throw new NodeError(400, "Password is incorrect!")

    const { password, ...rest } = user._doc
    res.status(200).json({ success: true, message: CONTENTS.LOGGED_IN, user: { ...rest, token: user.generateToken() } })
  } catch (error) {
    next(error)
  }
}

module.exports = { httpRegisterUser, httpLoginUser }
