const CONTENTS = require("../../contents/contents")
const UserModel = require("../models/user-model")

const httpRegisterUser = async (req, res) => {
  const user = new UserModel(req.user)
  await user.save()

  const { password, ...rest } = user._doc
  res.status(201).json({ success: true, message: CONTENTS.REGISTERED_USER, user: rest })
}

module.exports = { httpRegisterUser }
